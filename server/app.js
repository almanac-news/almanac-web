import express from 'express'
import config from '../config'
import chalk from 'chalk'
import Redis from 'ioredis'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
import r from 'rethinkdb'
import bodyParser from 'body-parser'
import mailgunSetup from 'mailgun-js'
import _ from 'lodash'

// FIXME: Please move this an environment variable instead.
import { secrets } from './config/secrets'

const app = express()
const httpServer = http.Server(app)
const client = new Redis(6379, 'data-cache')
const io = socketIO(httpServer)
const jsonParser = bodyParser.json()

/**
 * Used for /api/subscribe and /api/unsubscribe.
 * Helper functions, to be moved to utils
 */
const isValidEmail = email => {
  if (!email || typeof email !== 'string') return false
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * Expects an array of alpha-numeric strings. Used for /api/subscribe and /api/unsubscribe.
 */
const areValidCategories = categories => {
  if (!categories || !Array.isArray(categories)) return false
  const re = /^[a-zA-Z0-9- ]*$/
  for (const cat of categories) {
    if (typeof cat !== 'string' || re.test(cat) === false) return false
  }
  return true
}


/**
 * Enable webpack middleware if the app is being run in dev mode
 */
if (config.get('globals').__DEV__) {
  const webpack       = require('webpack')
  const webpackConfig = require('../build/webpack/development_hot')
  const compiler      = webpack(webpackConfig)

  console.log(chalk.bold.red('Running server in __DEV__ env.'))

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath : webpackConfig.output.publicPath
  }))

  app.use(require('./middleware/webpack-hmr')({ compiler }))
}

/**
 * During production, use a proper Express server
 * @param  {[type]} config.get('globals').__PROD__ [description]
 * @return {[type]}                                [description]
 */
if (config.get('globals').__PROD__) {
  // Linter will throw error for this console.log, please ignore
  console.log(chalk.bold.yellow('Running server in __PROD__ env.'))
  // Serve the static files from the 'dist' directory
  app.use(express.static('dist'))
}

/**
 * TODO: We may need this cache endpoint below to load the persistent data
 * after Redis has initialized the page
 */
// app.get('/api/news/cached', (req, res) => {
//   r.connect({ host: 'rt-database', port: 28015})
//     .then( conn => {
//       return r.table('news').orderBy({index: r.desc('created_date')}).limit(10).run(conn)
//     })
//     .then( array => {
//
//     })
// })

/**
 * This is used for infinite scrolling on the news-feed.
 * Will return :num? articles before the provided date.
 * Defaults to 5 articles.
 * Assumes that the 'news' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.get('/api/news/:date/:num?', (req, res) => {
  const date = req.params.date
  let num = null
  if (req.params.num && !isNaN(+req.params.num)) {
    num = +req.params.num
  } else {
    num = 5
  }
  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      console.log(date, typeof date, num, typeof num)
      return r.table('news').between(r.minval, date, {index: 'created_date'}) .orderBy({index: r.desc('created_date')}).limit(num).run(conn)
    })
    .then( cursor => {
      cursor.toArray(function(err, result) {
        if (err) throw err
        res.send(result).status(200)
      })
    })
    .catch( err => {
      console.log(err)
      res.sendStatus(503)
    })
})

/**
 * This is hit on the news-feed page.
 * Assumes that the 'news' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.get('/api/news', (req, res) => {
  // Open a change-feed connection to RethinkDB
  // Listens for any changes on 'news' table
  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      return r.table('news').changes().run(conn)
    })
    .then( cursor => {
      cursor.each((err, change) => {
        io.emit('newsEmitEvent', change)
      })
    })
    .catch( err => {
      console.log(err)
      res.sendStatus(503)
    })

  // Initially populate news-feed from Redis cache for faster load time
  client.keys('*', (err, keys) => {
    if (err) res.sendStatus(404)

    const pipeline = client.pipeline()

    keys.forEach( key => {
      pipeline.echo(key)
      pipeline.hgetall(key)
    })

    /**
     * pipeline pads data - this code prunes the result to
     * make it easier to work with on the frontend
     */
    pipeline.exec( (error, result) => {
      const prunedResult = {}
      let articleKey
      for (const article of result) {
        if (typeof article[1] === 'string') {
          articleKey = article[1]
        } else {
          prunedResult[articleKey] = article[1]
        }
      }
      res.send(prunedResult)
    })
  })
})

/**
 * Will be hit from the sub/unsub page.
 * Expects a body with {categories: ARRAY OF A/N STRINGS, email: VALID EMAIL STRING}
 * Could likely be refactored to combine with unsubscribe api.
 * Assumes that the 'subscribe' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.get('/api/finance/:start/:end', (req, res) => {
  let conn = null
  r.connect({ host: 'rt-database', port: 28015})
    .then( connection => {
      conn = connection
      return r.table('finance').orderBy({index:'time'}).between('2015-12-31T18:36:31Z', '2016-01-01T21:48:16').filter({'symbol': 'BLV'}).run(conn)
      // FIXME: Please remove above and uncomment below for real times
      // return r.table('finance').orderBy({index:'time'}).between(req.params.start, req.params.end).filter({'symbol': 'XLU'}).run(conn)
    })
    .then( cursor => {
      cursor.toArray((err, result) => {
        r.table('history').filter({'id': 'BLV'}).run(conn)
        .then( cursor2 => {
          cursor2.toArray((error, array) => {
            res.send({
              result: result,
              avg: array[0].avg,
              std: array[0].std,
              symbol: array[0].id
            })
          })
        })
        .catch( err2 => {
          console.log(err2)
          res.sendStatus(503)
        })
      })
    })
})

app.post('/api/subscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400)
  } else {
    const categories = req.body.categories
    const email = req.body.email
    // Manually generating an ID field here to prevent the same email from
    // subscribing twice to the same category. Trying to insert a duplicate primary key
    // in RethinkDB will produce an error that is handled by RethinkDB itself.
    // It'll be seen in the write response, but we aren't looking at that and most importantly,
    // it will NOT cause an exepction in our server code.
    const subscriptions = categories.map( cat => {
      return { id: cat + '@' + email, category: cat, email: email }
    })
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').insert(subscriptions).run(conn)
     })
     .then( () => {
       res.sendStatus(201)
     })
     .catch( err => {
       console.log(err)
       res.sendStatus(503)
     })
  }
})

// TODO: Add endpoint that listens for changes on history table, and uses node mailer to send emails when there are big events
// endpoint should then loop through all subscriptions and send them an email
// need to create a map of categories to stocks, call this endpoint on webpage load

const mailgun = mailgunSetup({apiKey: secrets.apiKey, domain: secrets.domain})

app.get('/api/subscribe/email', (req, res) => {
  let conn = null
  const emails = []
  r.connect({ host: 'rt-database', port: 28015})
    .then( connection => {
      conn = connection
      return r.table('history').changes().run(conn)
    })
    .then( cursor => {
      cursor.each((err, change) => {
        r.table('subscriptions').filter({}).coerceTo('array').run(conn)
        .then( cursor2 => {
          cursor2.forEach( subscriber => {
            if (_.includes(change.new_val.categories, subscriber.category)) {
              emails.push(subscriber.email)
            }
          })
          emails.forEach( email => {
            const emailData = {
              from: 'Almanac News Team <almncnews@gmail.com>',
              to: email,
              subject: 'Almanac News Alert!',
              text: JSON.stringify(change.new_val)
            }
            mailgun.messages().send(emailData, (error, body) => {
              if (error) res.send(JSON.stringify(err))
              res.send(JSON.stringify(body))
            })
          })
        })
        .catch( err2 => {
          console.log(err2)
          res.sendStatus(503)
        })
      })
      .catch( err => {
        console.log(err)
        res.sendStatus(503)
      })
    })
})

// FIXME: Incomplete table creation - please create comments table on the app-service

// TODO: Add live comment listener
app.get('/api/comments/:time', jsonParser, (req, res) => {
  const time = new Date(req.params.time)
  let startTime = new Date(req.params.time)
  startTime.setMinutes(startTime.getMinutes() - 300)
  startTime = startTime.toISOString()
  let endTime = new Date(req.params.time)
  endTime.setMinutes(endTime.getMinutes() + 300)
  endTime = endTime.toISOString()
  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      return r.table('comments').orderBy({index:'created_at'}).between(startTime, endTime).run(conn)
    })
    .then( cursor => {
      return cursor.toArray()
    })
    .then( result => {
      res.send(result)
    })
    .catch( err => {
      console.log(err)
      res.send(req).sendStatus(503)
    })
})

// TODO: created_at should be tied to a specific point - use 'selected'
app.post('/api/comments/', jsonParser, (req, res) => {
  r.tableList().contains('comments')
  .do( (tableExists) => {
    return r.branch(
      tableExists,
      { created: 0 },
      r.tableCreate('comments')
    )
  })
  r.connect({ host: 'rt-database', port: 28015})
    .then( conn => {
      return r.table('comments').insert({ comment: req.body.text, username: req.body.username, created_at: req.body.createdAt, articleId: req.body.articleId }).run(conn)
    })
   .then( () => {
     res.sendStatus(201)
   })
   .catch( err => {
     console.log(err)
     res.sendStatus(503)
   })
})

/**
 * Will be hit from the sub/unsub page.
 * Expects a body with {categories: ARRAY OF A/N STRINGS, email: VALID EMAIL STRING}
 * An unsub-all function would send an array with all categories.
 * Could likely be refactored to combine with subscribe api.
 * Assumes that the 'subscribe' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.post('/api/unsubscribe', jsonParser, (req, res) => {
  if (!req.body || !isValidEmail(req.body.email) || !areValidCategories(req.body.categories)) {
    res.sendStatus(400)
  } else {
    const categories = req.body.categories
    const email = req.body.email
    r.connect({ host: 'rt-database', port: 28015})
     .then( conn => {
       return r.table('subscriptions').filter(function(sub) {
         // Use a regex to filter for entries which match the provided categories.
         return r.expr(categories).contains(sub('category')).and(sub('email').eq(email))
       }).delete().run(conn)
     })
     .then( () => {
       res.sendStatus(201)
     })
     .catch( err => {
       console.log(err)
       res.sendStatus(503)
     })
  }
})

/**
 * This is hit from any specific article page.
 * Will increment or decrement 'like' count of an article by 1.
 * Expects a body with {categories: 1 OR -1} (technically 0 would work too, but why do that?)
 * If the article does not have a like field for some reason (old version of app)
 * the count will default to 1 vote. This is because the first vote
 * will be the one that inits the field and a -1 vote can CURRENTLY only be done after a +1 vote
 * from the same user.
 * Assumes that the 'news' table exists in RethinkDB.
 * This is created by the App-Service Python script.
 */
app.post('/api/like/:id', jsonParser, (req, res) => {
  if (!req.body || typeof req.body.vote !== 'number' ||  req.body.vote > 1 || req.body.vote < -1) {
    res.sendStatus(400)
  } else {
    r.connect({ host: 'rt-database', port: 28015})
      .then( conn => {
        return r.table('news').get(req.params.id).update({ likes: r.row('likes').add(req.body.vote).default(1) }).run(conn)
      })
     .then( () => {
       res.send().status(201)
     })
     .catch( err => {
       console.log(err)
       res.sendStatus(503)
     })
  }
})

/**
 * Default catch-all, fallback for single entry-point
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
})

export default httpServer
