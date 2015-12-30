import { SHOW_READER, HIDE_READER } from 'constants/newsPageView'
import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED, FETCH_NEWS_FAILED } from 'constants/news'
import { FETCH_FINANCE_STARTED, FETCH_FINANCE_COMPLETED, FETCH_FINANCE_FAILED } from 'constants/finance'
import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill()

export function showReader() {
  return dispatch => {
    dispatch({ type: SHOW_READER })
  }
}

export function hideReader() {
  return dispatch => {
    dispatch({ type: HIDE_READER })
  }
}

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

export function fetchFinance() {
  return dispatch => {
    dispatch({ type: FETCH_FINANCE_STARTED })

    return fetch('/api/finance')
    .then( response => response.json() )
    .then( data => {
      return {
        type: FETCH_FINANCE_COMPLETED,
        finance: data
      }
    })
    .then( data => dispatch(data) )
    .catch( () => dispatch({ type: FETCH_FINANCE_FAILED }) )
  }
}
