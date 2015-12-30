import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED, FETCH_NEWS_FAILED } from 'constants/news'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill()

export function fetchNews() {
  return dispatch => {
    dispatch({ type: FETCH_NEWS_STARTED })

    return fetch('/api/news')
      .then( response => response.json() )
      .then( data => {
        return {
          type: FETCH_NEWS_COMPLETED,
          news: data
        }
      })
      .then( data => dispatch(data) )
      .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) )
  }
}
