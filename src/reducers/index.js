import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { responsiveStateReducer } from 'redux-responsive'
import newsReducer from 'reducers/news'
import financeReducer from 'reducers/finance'
import newsPageViewReducer from 'reducers/newsPageView'
import realtimeReducer from 'reducers/realtime'
import subscriptionReducer from 'reducers/subscription'

export default combineReducers({
  browser: responsiveStateReducer,
  news: newsReducer,
  finance: financeReducer,
  newsPageView: newsPageViewReducer,
  realtime: realtimeReducer,
  subscription: subscriptionReducer,
  routing: routeReducer
})
