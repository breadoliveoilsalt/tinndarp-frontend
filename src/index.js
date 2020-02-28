
import React from 'react'
import { render } from 'react-dom'
import './index.css';
// import { configureStore } from '@reduxjs/toolkit'
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import App from './components/App';
// import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker'

// const store = configureStore({
//   reducer: rootReducer
// })

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
