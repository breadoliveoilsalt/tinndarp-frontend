import { combineReducers } from 'redux'
import apiRequestReducer from '../features/apiRequests/apiRequestSlice'
import itemsToBrowseReducer from '../features/browsing/itemsToBrowseSlice'
import userAccountReducer from '../features/userAccount/userAccountSlice'

export default combineReducers({
  apiRequest: apiRequestReducer,
  itemsToBrowse: itemsToBrowseReducer,
  userAccount: userAccountReducer
})
