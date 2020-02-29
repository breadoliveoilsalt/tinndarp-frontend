import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import loggerMiddleware from './middleware/logger'
// import monitorReducersEnhancer from './enhancers/monitorReducers'
import rootReducer from './reducers/rootReducer'

export default function configureStore(preloadedState) {
  // To see console.log of actions when running `npm test`:
  // Uncomment the commented lines below, and comment out their
  // successor lines
  // const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}
