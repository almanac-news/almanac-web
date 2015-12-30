import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'actions/newsPageView'
import { Reader } from 'components/Reader'
import moment from 'moment'
import _ from 'lodash'
import CircularProgress from 'material-ui/lib/circular-progress'

/* components */
import { LineChartViz } from 'components/LineChartViz'

const mapStateToProps = (state) => ({
  browser: state.browser,
  newsData: state.news.data,
  financeData: state.finance.data,
  realtimeData: state.realtime.data,
  routerState: state.routing
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export class NewsPageView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    params : React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired,
    newsData: React.PropTypes.object,
    financeData: React.PropTypes.object,
    realtimeData: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // call time parsing function
    this.props.actions.fetchFinance(this.props.params).then( () => console.log(this.props.financeData.result) )
  }

  // computeTimeRange(article_published, range) {
  // }

  parseData(dataArray) {
    return _.map(dataArray, (dataPoint) => {
      return {
        x: moment(dataPoint.time).toDate(),
        y: +dataPoint.price
      }
    })
  }

  render() {
    const { id } = this.props.params
    const article = this.props.newsData[id]

    if (!this.props.financeData) {
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h2>{ article.title }</h2></a></div>
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
              <CircularProgress className='loading' mode='indeterminate' size={4} />
            </div>
          </div>
        </div>
      )
    } else {
      const lineData = [
        {
          name: 'Almanac Graphed Data',
          values: this.parseData(this.props.financeData.result),
          strokeWidth: 1,
          strokeDashArray: '3,3'
        }
      ]
      return (
        <div className='container text-center'>
          <div><a href={ 'http://bit.ly/' + id }><h2>{ article.title }</h2></a></div>
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
              <LineChartViz
                chartTitle={ this.props.financeData.result[0].symbol }
                chartData={ lineData }
                useLegend={ false }
                useGridHorizontal={ true }
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageView)
