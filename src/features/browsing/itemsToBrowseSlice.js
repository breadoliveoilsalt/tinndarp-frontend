import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'
import axios from 'axios'

const initialState = {
  items: null,
  currentItem: null,
  fetchingItems: true
}

function itemsToBrowseReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, {items: action.payload})
    case LOAD_CURRENT_ITEM:
      return Object.assign({}, state, {currentItem: state.items[0]})
    default:
      return state
  }
}

export default itemsToBrowseReducer

export function loadItems(data) {
  return {
    type: LOAD_ITEMS,
    payload: data
  }
}

export function loadCurrentItem() {
  return {
    type: LOAD_CURRENT_ITEM
  }
}

const LOAD_ITEMS = 'LOAD_ITEMS'
const LOAD_CURRENT_ITEM = 'LOAD_CURRENT_ITEM'
// Prior code that threw fetchItems() is not a function error
// const initialState = {
//   items: null,
//   currentItem: null,
//   fetchingItems: true
// }
//
// const itemsToBrowseSlice = createSlice({
//   name: "itemsToBrowse",
//   initialState,
//   reducers: {
//     loadItems(state, action) {
//       state.items = action.payload
//     },
//     loadCurrentItem(state) {
//       state.currentItem = state.items[0]
//     },
//     updateFetchingStatus(state, action) {
//       state.fetchingItems = action.payload
//     }
//   }
// })
//
// export const { loadItems, loadCurrentItem, updateFetchingStatus } = itemsToBrowseSlice.actions
//
// export const { actions, reducer } = itemsToBrowseSlice
//
// export default reducer
//
export function fetchItems() {
  return function(dispatch) {
    // dispatch(updateFetchingStatus(true))
    return requests.getItems()
      .then(data => dispatch(loadItems(data)))
      .then(() => dispatch(loadCurrentItem()))
      // .then((itemData) => dispatch(loadCurrentItem(itemData[0])))
      // .then(() => dispatch(updateFetchingStatus(false)))
  }
}
