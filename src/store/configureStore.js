import rootReducer from '../reducers'
import thunk       from 'redux-thunk'
import DevTools    from 'containers/DevTools'
import { setupRealtime } from './Realtime'
import { addResponsiveHandlers } from 'redux-responsive'
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore(initialState, debug = false) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(thunk)

  if (debug) {
    createStoreWithMiddleware = compose(
      middleware,
      DevTools.instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')

      store.replaceReducer(nextRootReducer)
    })
  }

  setupRealtime(store)
  // Reducer created to capture responsive state of app
  addResponsiveHandlers(store)

  return store
}
