import socketClient from 'socket.io-client'
// import * as actions from 'actions/realtime'
// import * as likeActions from 'actions/newsPageView'
import * as newsActions from 'actions/news'

export function setupRealtime(store) {
  const io = socketClient()
  console.log('inside realtime')

  // io.on('REACT', (data) => {
  //   console.log('Inside client socket: ', data)
  //   // let state = store.getState();
  //
  //   if (actions.receiveEvent) {
  //     store.dispatch(actions.receiveEvent(data))
  io.on('newsEmitEvent', (data) => {
    // let state = store.getState();
    console.log(data)
    store.dispatch(newsActions.getRealtimeNews(data.new_val.article))

    // if (!data.old_val) {
    //   store.dispatch(actions.receiveEvent(data))
    // } else {
    //   store.dispatch(likeActions.toggleLike(data.new_val.id))
    // }
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
  //
  io.on('anotherEmitEvent', (data) => {
    console.log('inside update')
    console.log(data)
  })

  return io
}
