import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, Resizable } from 'react-timeseries-charts'
import { TimeSeries } from 'pondjs'

export class LineChartViz extends React.Component {
  static propTypes = {
    chartData: React.PropTypes.array.isRequired,
    assetData: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.firstSeries = new TimeSeries({
      'name': 'BLV',
      'columns': ['time', 'value'],
      'points': this.props.chartData
    })
  }

  firstSeriesStyle = {
    color: '#FF0000',
    width: 2
  }

  render() {
    const { avg, std, symbol } = this.props.assetData

    if (!this.props.chartData) {
      return (
        <div> Please Wait </div>
      )
    } else {
      return (
        <Resizable>
          <ChartContainer
            timeRange={this.firstSeries.timerange()}
            enablePanZoom={true}
            padding='-10'
            >
            <ChartRow height='250' debug={false}>
              <YAxis id='axis1' label={symbol} min={avg - (std * 2)} max={avg + (std * 2)} width='60' type='linear' format='$,.' />
              <Charts>
                <LineChart axis='axis1' series={this.firstSeries} style={this.firstSeriesStyle} />
                <Baseline axis='axis1' value={avg} label='Average' position='right'/>
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      )
    }
  }
}

export default LineChartViz
