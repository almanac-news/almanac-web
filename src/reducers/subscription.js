import * as types from 'constants/subscription'

const initialState = {
  categories: []
}

export default function subscriptionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SUBSCRIBE_STARTED:
      return Object.assign({}, state, {})

    case types.SUBSCRIBE_COMPLETED:
      return Object.assign({}, state, {
        categories: action.subscription
      })

    case types.SUBSCRIBE_FAILED:
      return Object.assign({}, state, {})

    default:
      return state
  }
}
