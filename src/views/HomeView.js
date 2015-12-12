import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from 'actions/news';
import { Link } from 'react-router';
import { NewsContainer } from 'containers/NewsContainer';
const CircularProgress = require('material-ui/lib/circular-progress');

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
  routerState : state.routing,
  news: state.news.data,
  isFetching: state.news.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(ActionCreators, dispatch)
});

export class HomeView extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    data: React.PropTypes.array,
    news: React.PropTypes.array,
    isFetching: React.PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    if (this.props.actions.fetchNews) {
      this.props.actions.fetchNews();
    }
  }

  componentWillReceiveProps (nextProps) {
    return nextProps;
  }

  render () {
    let newsContainerPending;

    if (this.props.isFetching) {
      newsContainerPending = <CircularProgress mode='indeterminate' size={2} />;
    } else if (this.props.news) {
      newsContainerPending = <NewsContainer data={ this.props.news } />;
    }

    return (
      <div className='container text-center'>
        <h1>Almanac News</h1>
          <hr />
        {newsContainerPending}
          <hr />
        <Link to='/about'>Go To About View</Link>
          <br/>
        {/* Demo of bit.ly shortened URL, random Trump news article */}
        <Link to='/news/1RztcJr'>Demo Unique News Page View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
