import React from 'react';
import { Link } from 'react-router';

/* components */

export class NewsPageView extends React.Component {
  static propTypes = {
    params : React.PropTypes.object.isRequired
  }

  render () {
    const { id } = this.props.params;

    return (
      <div className='container text-center'>
        <h1>News View</h1>
        <hr />
        {/* Currently our route param contains a bit.ly ID which allows us to revisit */}
        <div><a href={'http://bit.ly/' + id}>{id}</a></div>
        <hr />
        <Link to='/'>Back to Home View</Link>
      </div>
    );
  }
}

export default NewsPageView;
