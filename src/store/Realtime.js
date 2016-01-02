import socketClient from 'socket.io-client'
// import * as actions from 'actions/realtime'
// import * as likeActions from 'actions/newsPageView'
import * as newsActions from 'actions/news'

export function setupRealtime(store) {
  const io = socketClient()
  // console.log('inside realtime')

  io.on('emailData', (data) => {
    // console.log(data)
  })
  io.on('newsEmitEvent', (data) => {
    // modify the data to fit the format we send initial redis news load
    // FIXME: maybe fix this on app-service insertion?
    const key = data.new_val.article.url.slice(-7)
    const modifiedDataObj = {}
    modifiedDataObj[key] =  data.new_val.article
    store.dispatch(newsActions.getRealtimeNews(modifiedDataObj))
  })

  io.on('anotherEmitEvent', (data) => {
    // console.log('inside update')
    console.log(data)
  })

  return io
}
