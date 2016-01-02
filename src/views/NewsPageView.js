import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'actions/newsPageView'
import { Reader } from 'components/Reader'
import moment from 'moment'
import _ from 'lodash'
import CircularProgress from 'material-ui/lib/circular-progress'
import { LikeComponent } from 'components/Like'
import Paper from 'material-ui/lib/paper'
import { CommentList } from 'components/CommentList'
// import DatePicker from 'react-datepicker'

console.log('comment',  CommentList)
console.log('Paper',  Paper)

/* components */
import { LineChartViz } from 'components/LineChartViz'

const mapStateToProps = (state) => ({
  browser: state.browser,
  newsData: state.news.data,
  financeData: state.finance.data,
  realtimeData: state.realtime.data,
  routerState: state.routing,
  likeStatus: state.newsPageView.likeStatus,
  comments: state.comments.data,
  startDate: state.startDate
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export class NewsPageView extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    params : React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired,
    newsData: React.PropTypes.object,
    financeData: React.PropTypes.object,
    realtimeData: React.PropTypes.object,
    likeStatus: React.PropTypes.number,
    comments: React.PropTypes.array,
    startDate: React.PropTypes.object
  }

  static childContextTypes = {
    actions: React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired,
    articleId: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.startDate = moment()
  }

  getChildContext() {
    return {
      actions: this.props.actions,
      browser: this.props.browser,
      articleId: this.props.params.id
    }
  }

  componentWillMount() {
    const article = this.props.newsData[this.props.params.id]
    const timeRange = this.computeTimeRange(article.created_date, 1, 'h')
    this.props.actions.fetchFinance(timeRange).then(() => console.log('Finance data: ', this.props.financeData))
  }

  computeTimeRange(articlePublished, num, scale) {
    const utcL = moment(articlePublished.slice(0, 19))
    const utcH = moment(articlePublished.slice(0, 19))
    const time = utcL.format('YYYY-MM-DDTHH:mm:ss')
    const lower = utcL.subtract(num, scale).format('YYYY-MM-DDTHH:mm:ss')
    const upper = utcH.add(num, scale).format('YYYY-MM-DDTHH:mm:ss')

    return { 'lower': lower, 'upper': upper, 'time': time, 'articlePublished': articlePublished }
  }

  parseData(dataArray) {
    return _.map(dataArray, (dataPoint) => {
      return [(moment(dataPoint.time).valueOf()), +dataPoint.price]
    })
  }

  submitComment(e) {
    e.preventDefault()
    const username = this.refs.username.value
    const commentText = this.refs.commentText.value
    const time = this.props.startDate
    this.props.actions.postComment(username, commentText, this.props.params.id, time)
  }

  render() {
    const { id } = this.props.params
    const article = this.props.newsData[id]

    let likeProp

    if (this.props.likeStatus !== undefined) {
      likeProp = this.props.likeStatus
    } else {
      likeProp = 0
    }

    if (!this.props.financeData) {
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h4>{ article.title }</h4></a></div>
          <hr />
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <Reader
                title={ article.title }
                body={ article.article_text }
                bg_color={ 'white' }
                text_color={ 'black' }
                text_size={ 10 }
              />
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <Paper style={{ padding: '5' }}>
                <LikeComponent
                  articleId={ id }
                  likeStatus={ likeProp }
                />
              </Paper>
              <br />
              <CircularProgress
                className='loading'
                mode='indeterminate'
                size={2}
              />
            </div>
          </div>
          <hr />
        </div>
      )
    } else {
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h4>{ article.title }</h4></a></div>
          <hr />
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <Reader
                title={ article.title }
                body={ article.article_text }
                bg_color={ 'white' }
                text_color={ 'black' }
                text_size={ 10 }
              />
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <Paper style={{ padding: '5' }}>
                <LikeComponent
                  articleId={ id }
                  likeStatus={ this.props.likeStatus }
                />
              </Paper>
              <form>
                <div className='input-group'>
                  <span className='input-group-addon' id='basic-addon1'>@</span>
                  <input type='text' className='form-control' placeholder='Username' aria-describedby='basic-addon1' ref='username'/>
                </div>
                <br />
                <div className='form-group'>
                  <textarea className='form-control' placeholder='Leave a comment' rows='3' ref='commentText'></textarea>
                </div>
                <button type='submit' className='btn btn-default' onClick={ this.submitComment.bind(this) }>Submit</button>
              </form>
              <hr />
              <br />
              <LineChartViz
                chartData={ this.parseData(this.props.financeData.result) }
                assetData={{
                  avg: this.props.financeData.avg,
                  std: this.props.financeData.std,
                  symbol: this.props.financeData.symbol
                }}
              />
              <CommentList data={ this.props.comments } />
            </div>
          </div>
          <hr />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageView)
