const UPDATE_FETCHING_STATUS = 'UPDATE_FETCHING_STATUS'
const LOAD_ERRORS = 'LOAD_ERRORS'
const DELETE_ERRORS = 'DELETE_ERRORS'

const initialState = {
  fetchingItems: false,
  errors: null,
}

function apiRequestReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FETCHING_STATUS:
      return Object.assign({}, state, {fetchingItems: action.payload})
    case LOAD_ERRORS:
      return Object.assign({}, state, {errors: action.payload})
    case DELETE_ERRORS:
      return Object.assign({}, state, {errors: null})
    default:
      return state
  }
}

export default apiRequestReducer

export function updateFetchingStatus(bool) {
  return {
    type: UPDATE_FETCHING_STATUS,
    payload: bool
  }
}

export function loadErrors(errors) {
  return {
    type: LOAD_ERRORS,
    payload: errors
  }
}

export function deleteErrors() {
  return {
    type: DELETE_ERRORS
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
