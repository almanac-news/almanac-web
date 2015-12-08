import { combineReducers }    from 'redux';
import { routeReducer }       from 'redux-simple-router';
import counter                from './counter';
// import news                   from './news';

export default combineReducers({
  counter,
  // news,
  routing: routeReducer
});
