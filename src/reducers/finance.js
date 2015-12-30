import * as types from 'constants/finance';

const initialState = {
  isFetching: false
};

export default function financeReducer (state = initialState, action) {
  switch (action.type) {
  case types.FETCH_FINANCE_STARTED:
    return Object.assign({}, state, {
      isFetching: true
    });

  case types.FETCH_FINANCE_COMPLETED:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.finance
    });

  case types.FETCH_FINANCE_FAILED:
    return Object.assign({}, state, {
      isFetching: false
    });

  default:
    return state;
  }
}
