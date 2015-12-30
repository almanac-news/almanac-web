import React from 'react'
import { Link } from 'react-router'

export class NotFoundView extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <h1>Not Found</h1>
        <hr />
        <div>Sorry, the page you're looking for wasn't found.</div>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    )
  }
}

export default NotFoundView
