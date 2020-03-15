import * as requests from '../apiRequests/itemsAPIRequests'
import * as apiActions from '../apiRequests/apiRequestsSlice'

const LOAD_ITEMS = 'LOAD_ITEMS'
const UPDATE_CURRENT_ITEM = 'UPDATE_CURRENT_ITEM'
const RESET_ITEMS_TO_BROWSE_STATE = 'RESET_ITEMS_TO_BROWSE_STATE'
const REMOVE_CURRENT_ITEM = 'REMOVE_CURRENT_ITEM'

const initialState = {
  items: null,
  currentItem: null,
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

export function resetItemsToBrowseState() {
  return {
    type: RESET_ITEMS_TO_BROWSE_STATE
  }
}

export function fetchItems() {
  return function(dispatch) {
    dispatch(apiActions.updateFetchingStatus(true))
    return requests.getItems()
      .then(data => {
        dispatch(loadItems(data))
      })
      .then(() => dispatch(updateCurrentItem()))
      .then(() => dispatch(apiActions.updateFetchingStatus(false)))
  }
}
