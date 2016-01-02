import { SUBSCRIBE_STARTED, SUBSCRIBE_COMPLETED, SUBSCRIBE_FAILED } from 'constants/subscription'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill()

export function subscribe(categories, email) {
  return dispatch => {
    // /api/likes/:article
    dispatch({ type: SUBSCRIBE_STARTED })
    console.log(categories)
    console.log(email)
    return fetch('/api/subscribe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categories: categories,
        email: email
      })
    })
      .then( response => {
        // check if post was successful or not, then send relevant payload
        if (response.status === 201) {
          dispatch({
            type: SUBSCRIBE_COMPLETED,
            subscription: categories
          })
        } else {
          dispatch({ type: SUBSCRIBE_FAILED })
        }
      })
      // .catch( () => dispatch({ type: SUBSCRIBE_FAILED }) )
  }
}
