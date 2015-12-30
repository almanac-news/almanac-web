import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from 'actions/newsPageView';
import { Reader } from 'components/Reader';
import moment from 'moment';
import _ from 'lodash';

/* components */
import { LineChartViz } from 'components/LineChartViz';

const mapStateToProps = (state) => ({
  browser: state.browser,
  newsData: state.news.data,
  financeData: state.finance.data,
  realtimeData: state.realtime.data,
  routerState: state.routing
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export class NewsPageView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    params : React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired,
    newsData: React.PropTypes.object,
    financeData: React.PropTypes.object,
    realtimeData: React.PropTypes.object
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.actions.fetchFinance) {
      this.props.actions.fetchFinance(this.props.params);
      // this.props.actions.fetchNews();
    }
  }

  render () {
    const { id } = this.props.params;
    const article = this.props.newsData[id];

    function parseData (dataArray) {
      return _.map(dataArray, (dataPoint) => {
        return {
          x: moment(dataPoint.time).toDate(),
          y: +dataPoint.price
        };
      });
    }

    const lineData = [
      {
        name: 'Demo Line Series',
        values: parseData(this.props.financeData.result),
        strokeWidth: 3,
        strokeDashArray: '5,5'
      }
    ];

    return (
      <div className='container text-center'>
        <div><a href={'http://bit.ly/' + id}><h2>{ article.title }</h2></a></div>
        <hr />
        {/* TODO: Labels will most likely become a prop based on state */}
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
              chartTitle={ 'Stocks' }
              chartData={ lineData }
              useLegend={ false }
              yAxisLabel={ 'Value' }
              xAxisLabel={ 'Time' }
              useGridHorizontal={ true }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageView);
