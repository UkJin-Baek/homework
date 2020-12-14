import { createStore, applyMiddleware, compose  } from 'redux';

import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import sagas from './sagas'
import logger from 'redux-logger';

const devtools = window.devToolsExtension ? window.devToolsExtension : () => (fn => fn)

export default (initialState, services = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  
  const enhancers = [
    applyMiddleware(
      // logger,
      sagaMiddleware,
    ),
    devtools(),
  ]
  const store = createStore(reducer, initialState, compose(...enhancers))
  let sagaTask = sagaMiddleware.run(sagas, services)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services)
      })
    })
  }
  return store;
}