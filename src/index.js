
import React from 'react'
import { render } from 'react-dom'
import './index.css';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './components/App';
import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker'

const store = configureStore({
  reducer: rootReducer
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
