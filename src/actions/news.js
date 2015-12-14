import { FETCH_NEWS_STARTED, FETCH_NEWS_COMPLETED, FETCH_NEWS_FAILED } from 'constants/news';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function fetchNews () {
  return dispatch => {
    dispatch({ type: FETCH_NEWS_STARTED });

    return fetch('/api/news')
      .then( response => response.json() )
      .then( data => {
        return {
          type: FETCH_NEWS_COMPLETED,
          news: data
        };
      })
      .then( data => dispatch(data) )
<<<<<<< 3435806990d27a2b438e8b6c08a078bffd242853
      .catch( () => dispatch({ type: FETCH_NEWS_FAILED }) );
=======
      // NOTE: uncomment to catch error
      .catch( err => console.log(err) );
>>>>>>> Adding in data constants and reducers and NewsCard
  };
}
