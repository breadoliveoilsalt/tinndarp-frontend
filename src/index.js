
import React from 'react'
import { render } from 'react-dom'
import './index.css';
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import * as serviceWorker from './serviceWorker'

const store = configureStore()

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
