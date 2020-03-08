const LOAD_ERRORS = 'LOAD_ERRORS'
const DELETE_ERRORS = 'DELETE_ERRORS'
const RESET_USER_ACCOUNT_STATE = 'RESET_USER_ACCOUNT_STATE'
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS'
const ADD_TOKEN = 'ADD_TOKEN'
const DELETE_TOKEN = 'DELETE_TOKEN'

const initialState = {
  errors: null,
  loggedIn: false,
  token: null,
}

function userAccountReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ERRORS:
      return Object.assign({}, state, {errors: action.payload})
    case DELETE_ERRORS:
      return Object.assign({}, state, {errors: null})
    case RESET_USER_ACCOUNT_STATE:
      return Object.assign({}, initialState)
    case UPDATE_LOGGED_IN_STATUS:
      return Object.assign({}, state, {loggedIn: action.payload})
    case ADD_TOKEN:
      return Object.assign({}, state, {token: action.payload})
    case DELETE_TOKEN:
      return Object.assign({}, state, {token: null})
    default:
      return state
  }
}

export default userAccountReducer

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

export function resetuserAccountState() {
  return {
    type: RESET_USER_ACCOUNT_STATE
  }
}

export function updateLoggedInStatus(bool) {
  return {
    type: UPDATE_LOGGED_IN_STATUS,
    payload: bool
  }
}

export function addToken(token) {
  return {
    type: ADD_TOKEN,
    payload: token
  }
}

export function deleteToken() {
  return {
    type: DELETE_TOKEN
  }
}
