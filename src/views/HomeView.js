import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from 'actions/news';
import { NewsContainer } from 'containers/NewsContainer';
import { NewsError } from 'components/NewsError';
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
    news: React.PropTypes.object,
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
    const { isFetching, news } = this.props;

    let newsContainerPending;

    if (!isFetching && !news) {
      newsContainerPending = <NewsError />;
    } else if (isFetching) {
      newsContainerPending = <CircularProgress className='loading' mode='indeterminate' size={2} />;
    } else if (!isFetching && news) {
      newsContainerPending = <NewsContainer data={ news } />;
    }

    return (
      <div className='container text-center'>
        <h1>News Feed</h1>
          <hr />
        <div>{newsContainerPending}</div>
          <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
