import * as requests from './browsingAPIRequests'
import * as apiActions from '../apiRequests/apiRequestsSlice'

const LOAD_ITEMS = 'LOAD_ITEMS'
const UPDATE_CURRENT_ITEM = 'UPDATE_CURRENT_ITEM'
const RESET_ITEMS_TO_BROWSE_STATE = 'RESET_ITEMS_TO_BROWSE_STATE'
const REMOVE_CURRENT_ITEM = 'REMOVE_CURRENT_ITEM'

const initialState = {
  items: null,
  currentItem: null,
}

function browsingReducer(state = initialState, action) {
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

export default browsingReducer

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

export function resetbrowsingState() {
  return {
    type: RESET_ITEMS_TO_BROWSE_STATE
  }
}

export function fetchItems(params) {
  return function(dispatch) {
    dispatch(apiActions.updateFetchingStatus(true))
    return requests.getItemsToBrowse(params)
      .then(data => {
        dispatch(loadItems(data))
      })
      .then(() => dispatch(updateCurrentItem()))
      .then(() => dispatch(apiActions.updateFetchingStatus(false)))
      .catch( error => {
        dispatch(apiActions.loadErrors(error))
        dispatch(apiActions.updateFetchingStatus(false))
      })
  }
}

export function postBrowsingDecisionAction(params) {
  return function(dispatch) {
    return requests.postBrowsingDecision(params)
      .then( data => {
        if (data.errors) {
          dispatch(apiActions.loadErrors(data.errors))
        } else {
          dispatch(removeCurrentItem())
          dispatch(updateCurrentItem())
        }
      })    
      .catch( error => {
        console.log(error)
        dispatch(apiActions.loadErrors(error))
      })
  }
}
