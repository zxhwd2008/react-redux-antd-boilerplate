import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSagas from './rootSagas'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension &&
      process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f
    )
  )
  sagaMiddleware.run(rootSagas)

  return store
}

export default configureStore
