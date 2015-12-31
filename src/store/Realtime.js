import socketClient from 'socket.io-client'
import * as actions from 'actions/realtime'
import * as likeActions from 'actions/newsPageView'

export function setupRealtime(store) {
  const io = socketClient()

  // io.on('REACT', (data) => {
  //   console.log('Inside client socket: ', data)
  //   // let state = store.getState();
  //
  //   if (actions.receiveEvent) {
  //     store.dispatch(actions.receiveEvent(data))
  io.on('something', (data) => {
    console.log('inside client socket ', data)
    // let state = store.getState();

    console.log('inside something')
    console.log(data)
    if (!data.old_val) {
      console.log(1)
      store.dispatch(actions.receiveEvent(data))
    } else {
      console.log(2)
      store.dispatch(likeActions.toggleLike(data.new_val.id))
    }
    // if (!change.old_val) {
    //   store.dispatch(actions.addEventSuccess(change.new_val))
    // } else if (!change.new_val) {
    //   store.dispatch(actions.deleteEventSuccess(change.old_val))
    // } else {
    //   store.dispatch(actions.editEventSuccess(change.new_val))
    // }
  })
  //
  // io.on('update', (data) => {
  //   console.log('inside update');
  //   console.log(data);
  // });

  return io
}
