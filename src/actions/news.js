import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED } from 'constants/news';
import fetch from 'isomorphic-fetch';

export function fetchNews () {
  return dispatch => {
    dispatch({ type: FETCH_NEWS_STARTED });

    return fetch('app-service:5000/news')
      .then( response => response.json() )
      .then( data => {
        return {
          type: FETCH_NEWS_COMPLETED,
          news: data.map(newsItem => newsItem)
        };
      })
      .then( data => dispatch(data) )
      // NOTE: uncomment to catch error
      .catch( err => console.log(err) );
  };
}
