import { combineReducers } from 'redux'
import itemsToBrowseReducer from '../features/browsing/itemsToBrowseSlice'
import userAccountReducer from '../features/userAccount/userAccountSlice'

export default combineReducers({
  itemsToBrowse: itemsToBrowseReducer,
  userAccount: userAccountReducer
})
