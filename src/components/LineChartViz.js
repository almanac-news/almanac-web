import React from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Baseline, Resizable, Tracker } from 'react-timeseries-charts'
import { TimeSeries } from 'pondjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import * as ActionCreators from 'actions/newsPageView'

const mapStateToProps = (state) => ({
  tracker: this.state.tracker
})

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(ActionCreators, dispatch)
// })
// Fire some action from prop

export class LineChartViz extends React.Component {
  static propTypes = {
    chartData: React.PropTypes.array.isRequired,
    assetData: React.PropTypes.object.isRequired,
    tracker: React.PropTypes.object
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired,
    articleId: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.tracker = null
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

  handleTrackerChanged = (t) => {
    this.setState({ tracker: t })
    // console.log(this.state)
    this.context.actions.fetchComments(this.context.articleId, t)
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
            trackerPosition={this.props.tracker}
            onTrackerChanged={this.handleTrackerChanged}
            >
            <ChartRow height='250' debug={false}>
              <YAxis id='axis1' label={symbol} min={70} max={90} width='60' type='linear' format='$,.' />
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

export default connect(mapStateToProps)(LineChartViz)
