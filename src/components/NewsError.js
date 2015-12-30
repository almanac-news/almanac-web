import React from 'react'
import { Alert } from 'react-bootstrap'

/**
 * React allows for 'stateless components, but the export must happen here.'
 */
export const NewsError = () => {
  return (
    <Alert bsStyle='info'>
      <strong>All of our servers are busy right now.</strong>
      <br />
      <br />
      Please try again in a few minutes.
    </Alert>
  )
}
