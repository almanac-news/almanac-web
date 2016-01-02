import { SHOW_READER, HIDE_READER, TOGGLE_LIKE } from 'constants/newsPageView'
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

export function fetchFinance(timeRange) {
  return dispatch => {
    dispatch({ type: FETCH_FINANCE_STARTED })

    return fetch('/api/finance/' + timeRange.lower + '/' + timeRange.upper)
    .then( response => response.json() )
    .then( data => {
      return {
        type: FETCH_FINANCE_COMPLETED,
        finance: data
      }
    })
    .then( data => dispatch(data) )
    .catch( () => dispatch({
      type: FETCH_FINANCE_FAILED
    })
    )
  }
}

export function toggleLike(articleId, likeStatus) {
  return dispatch => {
    if (likeStatus === 1) {
      // /api/likes/:article
      return fetch('/api/like/' + articleId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vote: -1
        })
      })
        .then( response => {
          if (response.status === 201) {
            dispatch({
              type: TOGGLE_LIKE,
              articleId: articleId,
              likeStatus: 0
            })
          }
          // check if data.value is 201, if it is, send relevant payload
        })
        // .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) );
    } else {
      return fetch('/api/like/' + articleId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vote: 1
        })
      })
        .then( response => {
          if (response) {
            // console.log(response)
          }
          // check if data.value is 201, if it is, send relevant payload
          dispatch({
            type: TOGGLE_LIKE,
            articleId: articleId,
            likeStatus: 1
          })
        })
        // .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) );
    }
  }
}
