import * as types from 'constants/news'

const initialState = {
  isFetching: false
}

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_NEWS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      })

    case types.FETCH_NEWS_COMPLETED:
      const extendData = Object.assign({}, state.data, action.news)
      return Object.assign({}, state, {
        isFetching: false,
        data: extendData
      })

    case types.FETCH_NEWS_FAILED:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state
  }
}
