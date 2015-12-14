import * as types from 'constants/data';

const initialState = {
  data: [],
  isFetching: false
};

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
  case types.FETCH_DATA_STARTED:
    return Object.assign({}, state, {
      isFetching: true
    });

  case types.FETCH_DATA_COMPLETED:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.data
    });

  default:
    return state;
  }
}
