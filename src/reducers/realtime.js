import * as types from 'constants/realtime'

const initialState = {
  data: {}
}

export default function realtimeReducer(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_EVENT_COMPLETE:
      return Object.assign({}, state, {
        data: action.data
      })

    default:
      return state
  }
}
