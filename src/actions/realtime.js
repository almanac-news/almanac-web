import { RECEIVE_EVENT_COMPLETE } from 'constants/realtime';

export function receiveEvent (testData) {
  return dispatch => {
    // console.log('outer loop of receiveEvent');
    // console.log(testData.react);
    // let state = store.getState();
    return dispatch({
      type: RECEIVE_EVENT_COMPLETE,
      data: testData
    });
  };
}
