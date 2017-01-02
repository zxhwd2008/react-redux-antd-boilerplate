import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router';
import configureStore from './modules/configureStore'
import configureHistory from './modules/configureHistory'
import routes from './modules/routes';

export const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
export const history = configureHistory(store)

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
