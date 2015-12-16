import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED } from 'constants/news';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function fetchNews () {
  return dispatch => {
    dispatch({ type: FETCH_NEWS_STARTED });

    // NOTE: Please look at 'Fetch API'
    return fetch('/api/news')
      .then( response => response.json() )
      .then( data => {
        console.log('shit coming from server!', data);
        return {
          type: FETCH_NEWS_COMPLETED,
          news: data.map(newsItem => newsItem)
        };
      })
      .then( data => dispatch(data) )
      .catch( err => console.error(err) );
  };
}
