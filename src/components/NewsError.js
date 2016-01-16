import React from 'react'
import { Alert } from 'react-bootstrap'

/**
 * NewsError is an exported, stateless component.
 * @return {[type]} [description]
 */
export const NewsError = () => {
  return (
    <Alert bsStyle='info'>
      <strong>All of our servers are busy right now.</strong>
      <br />
      <br />
      <div>Please try again in a few minutes.</div>
    </Alert>
  )
}
