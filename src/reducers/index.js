import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import newsReducer from 'reducers/news';
import newsPageViewReducer from 'reducers/newsPageView';
import realtimeReducer from 'reducers/realtime';

export default combineReducers({
  news: newsReducer,
  newsPageView: newsPageViewReducer,
  realtime: realtimeReducer,
  routing: routeReducer
});
