import { SHOW_READER, HIDE_READER } from 'constants/newsPageView';

export function showReader () {
  return dispatch => {
    dispatch({ type: SHOW_READER });
  };
}

export function hideReader () {
  return dispatch => {
    dispatch({ type: HIDE_READER });
  };
}
