import React from 'react'
import { Link } from 'react-router'

/**
 * NotFoundView is an exported, stateless component.
 * @return {[type]} [description]
 */
export const NotFoundView = () => {
  return (
    <div className='container text-center'>
      <h1>Not Found</h1>
      <hr />
      <div>Sorry, the page you're looking for wasn't found.</div>
      <hr />
      <Link to='/'>Back to Home Page</Link>
    </div>
  )
}
