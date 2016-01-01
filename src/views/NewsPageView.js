import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'actions/newsPageView'
import { Reader } from 'components/Reader'
import moment from 'moment'
import _ from 'lodash'
import CircularProgress from 'material-ui/lib/circular-progress'
import { LikeComponent } from 'components/Like'

/* components */
import { LineChartViz } from 'components/LineChartViz'

const mapStateToProps = (state) => ({
  browser: state.browser,
  newsData: state.news.data,
  financeData: state.finance.data,
  realtimeData: state.realtime.data,
  routerState: state.routing,
  likeStatus: state.newsPageView.likeStatus
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
    likeStatus: React.PropTypes.number
  }

  static childContextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  getChildContext() {
    return {actions: this.props.actions}
  }

  componentWillMount() {
    const article = this.props.newsData[this.props.params.id]
    const timeRange = this.computeTimeRange(article.created_date, 1, 'h')
    console.log('timeRange: ', timeRange)
    this.props.actions.fetchFinance(timeRange).then(() => console.log('Finance data: ', this.props.financeData))
  }

  componentWillUpdate() {
    console.log(this.props, 'likeStatus')
  }

  computeTimeRange(articlePublished, num, scale) {
    const utcL = moment(articlePublished.slice(0, 19))
    const utcH = moment(articlePublished.slice(0, 19))
    const time = utcL.format('YYYY-MM-DDTHH:mm:ss')
    const lower = utcL.subtract(num, scale).format('YYYY-MM-DDTHH:mm:ss')
    const upper = utcH.add(num, scale).format('YYYY-MM-DDTHH:mm:ss')

    return {'lower': lower, 'upper': upper, 'time': time, 'articlePublished': articlePublished}
  }

  parseData(dataArray) {
    return _.map(dataArray, (dataPoint) => {
      return [(moment(dataPoint.time).valueOf()), +dataPoint.price]
    })
  }


  render() {
    const { id } = this.props.params
    const article = this.props.newsData[id]
    let likeProp = this.props.likeStatus

    if (!this.props.financeData) {
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h2>{ article.title }</h2></a></div>
          <hr />
          <LikeComponent articleId={ id } likeStatus={ likeProp } />
          <hr />
          <div className='row'>
            <div className='col-xs-12'>
              <Reader
                title={ article.title }
                body={ article.article_text }
                bg_color={ 'white' }
                text_color={ 'black' }
                text_size={ 10 }
              />
            </div>
          </div>
          <hr />
          <div className='row'>
              <CircularProgress className='loading' mode='indeterminate' size={4} />
          </div>
        </div>
      )
    } else {
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h2>{ article.title }</h2></a></div>
          <hr />
          <LikeComponent articleId={ id } likeStatus={ this.props.likeStatus } />
          <hr />
          <div className='row'>
            <div className='col-xs-12'>
              <Reader
                title={ article.title }
                body={ article.article_text }
                bg_color={ 'white' }
                text_color={ 'black' }
                text_size={ 10 }
              />
            </div>
          </div>
          <hr />
          <div className='row'>
              <LineChartViz
                chartData={ this.parseData(this.props.financeData.result) }
                assetData={{
                  avg: this.props.financeData.avg,
                  std: this.props.financeData.std,
                  symbol: this.props.financeData.symbol
                }}
              />
          </div>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageView)
