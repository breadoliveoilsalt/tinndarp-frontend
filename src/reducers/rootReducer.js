import { combineReducers } from 'redux'
import apiRequestsReducer from '../features/apiRequests/apiRequestsSlice'
import browsingReducer from '../features/browsing/browsingSlice'
import userAccountReducer from '../features/userAccount/userAccountSlice'

export default combineReducers({
  apiRequest: apiRequestsReducer,
  browsing: browsingReducer,
  userAccount: userAccountReducer
})
