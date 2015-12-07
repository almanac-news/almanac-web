import React from 'react';
import { Link } from 'react-router';

/* components */

export class NewsView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>News View</h1>
        <hr />
        <Link to='/'>Back to Home View</Link>
      </div>
    );
  }
}

export default NewsView;
