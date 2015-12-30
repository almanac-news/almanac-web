import socketClient from 'socket.io-client'
import * as actions from 'actions/realtime'

export function setupRealtime(store) {
  const io = socketClient()

  io.on('REACT', (data) => {
    console.log('Inside client socket: ', data)
    // let state = store.getState();

    if (actions.receiveEvent) {
      store.dispatch(actions.receiveEvent(data))
    }
    // if (!change.old_val) {
    //   store.dispatch(actions.addEventSuccess(change.new_val))
    // } else if (!change.new_val) {
    //   store.dispatch(actions.deleteEventSuccess(change.old_val))
    // } else {
    //   store.dispatch(actions.editEventSuccess(change.new_val))
    // }
  })

  return io
}
