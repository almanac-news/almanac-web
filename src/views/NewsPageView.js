import React from 'react';
import { Link } from 'react-router';

// TODO: Please check the ES6 import syntax for this
const moment = require('moment');
const _ = require('lodash');

/* components */
import { LineChartViz } from 'components/LineChartViz';

export class NewsPageView extends React.Component {
  static propTypes = {
    params : React.PropTypes.object.isRequired
  }

  render () {
    const { id } = this.props.params;

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
        <h1>News View</h1>
        <hr />
        {/* Currently our route param contains a bit.ly ID which allows us to revisit */}
        <div><a href={'http://bit.ly/' + id}>{id}</a></div>
        <hr />
        {/* TODO: Labels will most likely become a prop based on state */}
        <LineChartViz
          chartTitle={'USD/EUR (EUR=X)'}
          chartData={lineData}
          useLegend={false}
          yAxisLabel={'Value'}
          xAxisLabel={'Time'}
          useGridHorizontal={false}
        />
        <br />
        <hr />
        <Link to='/'>Back to Home View</Link>
      </div>
    );
  }
}

export default NewsPageView;