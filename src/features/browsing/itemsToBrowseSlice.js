import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'

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
export function fetchItems() {
  return function(dispatch) {
    return requests.getItems()
      .then(data => dispatch(loadItems(data)))
      .then(() => dispatch(loadCurrentItem()))
  }
}
