import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED } from 'constants/news';
import fetch from 'isomorphic-fetch';

export function fetchNews () {
  return dispatch => {
    dispatch({ type: FETCH_NEWS_STARTED });

    // NOTE: Please look at 'Fetch API'
    return fetch('http://172.17.0.2:5000/news', { mode: 'no-cors' })
      .then( response => response.json() )
      .then( data => {
        return {
          type: FETCH_NEWS_COMPLETED,
          news: data.map(newsItem => newsItem)
        };
      })
      .then( data => dispatch(data) )
      .catch( err => console.error(err) );
  };
}
