
import { combineReducers } from "redux"
import feature1Reducer from "features/feature1Reducer"
import feature2Reducer from "features/feature2Reducer"
import itemsReducer from "../components/itemsReducer"

export default combineReducers({
  feature1: feature1Reducer,
  feature2: feature2Reducer,
  items: itemsReducer
})
