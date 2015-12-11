import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';
import newsReducer            from './news';

export default combineReducers({
  news: newsReducer,
  routing: routeReducer
});
