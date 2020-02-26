
import React from 'react'
// from React: import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './components/App';
// From Redux: import App from './components/App'
import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker';

const store = configureStore({
  reducer: rootReducer
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
