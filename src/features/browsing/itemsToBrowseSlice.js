import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'

const LOAD_ITEMS = 'LOAD_ITEMS'
const LOAD_CURRENT_ITEM = 'LOAD_CURRENT_ITEM'
const UPDATE_FETCHING_STATUS = 'UPDATE_FETCHING_STATUS'
const RESET_ITEMS_TO_BROWSE_STATE = 'RESET_ITEMS_TO_BROWSE_STATE'

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
    case UPDATE_FETCHING_STATUS:
      return Object.assign({}, state, {fetchingItems: action.payload})
    case RESET_ITEMS_TO_BROWSE_STATE:
      return Object.assign({}, state, initialState)
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

export function updateFetchingStatus(bool) {
  return {
    type: UPDATE_FETCHING_STATUS,
    payload: bool
  }
}

export function resetItemsToBrowseState() {
  return {
    type: RESET_ITEMS_TO_BROWSE_STATE
  }
}

export function fetchItems() {
  return function(dispatch) {
    dispatch(updateFetchingStatus(true))
    return requests.getItems()
      .then(data => {
        dispatch(loadItems(data))
      })
      .then(() => dispatch(loadCurrentItem()))
      .then(() => dispatch(updateFetchingStatus(false)))
  }
}
