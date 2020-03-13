import { combineReducers } from 'redux'
import apiRequestsReducer from '../features/apiRequests/apiRequestsSlice'
import itemsToBrowseReducer from '../features/browsing/itemsToBrowseSlice'
import userAccountReducer from '../features/userAccount/userAccountSlice'

export default combineReducers({
  apiRequest: apiRequestsReducer,
  itemsToBrowse: itemsToBrowseReducer,
  userAccount: userAccountReducer
})
