import * as types from 'constants/comments'

const initialState = {
  isFetching: false
}

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COMMENTS_STARTED:
      return Object.assign({}, state, {
        isFetching: true
      })

    case types.FETCH_COMMENTS_COMPLETED:
      console.log(action.comments)
      return Object.assign({}, state, {
        isFetching: false,
        data: action.comments
      })

    case types.FETCH_COMMENTS_FAILED:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state
  }
}
