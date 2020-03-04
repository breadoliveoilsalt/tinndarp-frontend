import * as requests from '../../api/backendAPIRequests'

const LOAD_ITEMS = 'LOAD_ITEMS'
const UPDATE_CURRENT_ITEM = 'UPDATE_CURRENT_ITEM'
const UPDATE_FETCHING_STATUS = 'UPDATE_FETCHING_STATUS'
const RESET_ITEMS_TO_BROWSE_STATE = 'RESET_ITEMS_TO_BROWSE_STATE'
const REMOVE_CURRENT_ITEM = 'REMOVE_CURRENT_ITEM'

const initialState = {
  items: null,
  currentItem: null,
  fetchingItems: true
}

function itemsToBrowseReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, {items: action.payload})
    case UPDATE_CURRENT_ITEM:
      if (state.items.length > 0) {
        return Object.assign({}, state, {currentItem: state.items[0]})
      } else {
        return state
      }
    case REMOVE_CURRENT_ITEM:
      const remainingItems = state.items.slice(1)
      return Object.assign({}, state, {currentItem: null, items: remainingItems})
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

export function updateCurrentItem() {
  return {
    type: UPDATE_CURRENT_ITEM
  }
}

export function removeCurrentItem() {
  return {
    type: REMOVE_CURRENT_ITEM
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
      .then(() => dispatch(updateCurrentItem()))
      .then(() => dispatch(updateFetchingStatus(false)))
  }
}
