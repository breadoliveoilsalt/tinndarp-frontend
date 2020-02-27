import { combineReducers } from 'redux'
import itemsToBrowseReducer from '../features/browsing/itemsToBrowseSlice'

export default combineReducers({
  itemsToBrowse: itemsToBrowseReducer
})
