import React from 'react';
import { Link } from 'react-router';

/* components */
import { LineChartViz } from 'components/LineChartViz';

export class NewsPageView extends React.Component {
  static propTypes = {
    params : React.PropTypes.object.isRequired
  }

  render () {
    const { id } = this.props.params;

    // FIXME: Do not store data in here, should be in redux store.
    const demoLineData = [
      {
        name: 'Soroush\'s Mood',
        values: [
          { x:0, y:20 },
          { x:1, y:30 },
          { x:2, y:10 },
          { x:3, y:5 },
          { x:4, y:8 },
          { x:5, y:15 },
          { x:6, y:10 }
        ],
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
          chartTitle={id}
          chartData={demoLineData}
          useLegend={true}
          yAxisLabel={'Value'}
          xAxisLabel={'Time'}
          gridHorizontal={false}
        />
        <br />
        <hr />
        <Link to='/'>Back to Home View</Link>
      </div>
    );
  }
}

export default NewsPageView;
