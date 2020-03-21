import { combineReducers } from 'redux'
import apiRequestsReducer from '../features/apiRequests/apiRequestsSlice'
import browsingReducer from '../features/browsing/browsingSlice'
import userAccountReducer from '../features/userAccount/userAccountSlice'
import comparingReducer from '../features/comparing/comparingSlice'

export default combineReducers({
  apiRequest: apiRequestsReducer,
  browsing: browsingReducer,
  userAccount: userAccountReducer,
  comparing: comparingReducer
})
