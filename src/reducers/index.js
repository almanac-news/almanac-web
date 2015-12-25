import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import newsReducer from 'reducers/news';
import newsPageViewReducer from 'reducers/newsPageView';

export default combineReducers({
  news: newsReducer,
  newsPageView: newsPageViewReducer,
  routing: routeReducer
});
