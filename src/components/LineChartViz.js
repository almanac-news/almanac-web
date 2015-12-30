import React            from 'react'
import { LineChart }    from 'react-d3'

// File is named with 'Viz' to diff it from the react-d3 component
export class LineChartViz extends React.Component {
  static propTypes = {
    chartTitle : React.PropTypes.string.isRequired,
    chartData: React.PropTypes.array.isRequired,
    useLegend : React.PropTypes.bool.isRequired,
    useGridHorizontal : React.PropTypes.bool.isRequired,
    yAxisLabel: React.PropTypes.string,
    xAxisLabel: React.PropTypes.string
  }

  render() {
    return (
      <LineChart
        title={this.props.chartTitle}
        data={this.props.chartData}
        legend={this.props.useLegend}
        width={500}
        height={400}
        viewBoxObject={ { x:0, y:0, width:500, height:400 } }
        yAxisLabel={this.props.yAxisLabel}
        xAxisLabel={this.props.xAxisLabel}
        gridHorizontal={this.props.useGridHorizontal}
      />
    )
  }
}

export default LineChartViz
