import React from 'react';
import { Link } from 'react-router';
import { Tools } from 'layouts/Tools'

export class AboutView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>This is the about view!</h1>
        <hr />
        <Tools />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default AboutView;
