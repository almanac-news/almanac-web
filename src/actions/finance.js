import { FETCH_FINANCE_STARTED, FETCH_FINANCE_COMPLETED, FETCH_FINANCE_FAILED } from 'constants/finance';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function fetchFinance () {
  return dispatch => {
    dispatch({ type: FETCH_FINANCE_STARTED });

    return fetch('/api/finance')
      .then( response => response.json() )
      .then( data => {
        return {
          type: FETCH_FINANCE_COMPLETED,
          finance: data
        };
      })
      .then( data => dispatch(data) )
      .catch( () => dispatch({ type: FETCH_FINANCE_FAILED }) );
  };
}
