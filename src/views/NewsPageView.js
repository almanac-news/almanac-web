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
  routerState: state.routing,
  newsData: state.news.data
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export class NewsPageView extends React.Component {
  static propTypes = {
    params : React.PropTypes.object.isRequired,
    newsData: React.PropTypes.object.isRequired
  }

  render () {
    const { id } = this.props.params;
    const article = this.props.newsData[id];

    // FIXME: Do not store data in here, should be in redux store.
    const demoLineData = [{'date': '2015-12-09', 'value': '0.91794'}, {'date': '2015-12-08', 'value': '0.92302'}, {'date': '2015-12-07', 'value': '0.91878'}, {'date': '2015-12-04', 'value': '0.91609'}, {'date': '2015-12-03', 'value': '0.94224'}, {'date': '2015-12-02', 'value': '0.9411'}, {'date': '2015-12-01', 'value': '0.94581'}, {'date': '2015-11-30', 'value': '0.94491'}, {'date': '2015-11-27', 'value': '0.943'}, {'date': '2015-11-26', 'value': '0.94118'}, {'date': '2015-11-25', 'value': '0.93951'}, {'date': '2015-11-24', 'value': '0.93967'}, {'date': '2015-11-23', 'value': '0.93976'}];

    function parseData (dataArray) {
      return _.map(dataArray, (dataPoint) => {
        return {
          x: moment(dataPoint.date).toDate(),
          y: +dataPoint.value
        };
      });
    }

    const lineData = [
      {
        name: 'Demo Line Series',
        values: parseData(demoLineData),
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
              chartTitle={ 'USD/EUR (EUR=X)' }
              chartData={ lineData }
              useLegend={ false }
              yAxisLabel={ 'Value' }
              xAxisLabel={ 'Time' }
              useGridHorizontal={ false }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageView);
