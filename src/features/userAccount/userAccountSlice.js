import { postCreateAccount } from '../apiRequests/createAccountAPIRequest'
import { loadErrors, deleteErrors } from '../apiRequests/apiRequestSlice'

const RESET_USER_ACCOUNT_STATE = 'RESET_USER_ACCOUNT_STATE'
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS'
const TINNDARP_TOKEN_KEY = 'tinndarp_token'

const initialState = {
  loggedIn: false,
}

function userAccountReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_USER_ACCOUNT_STATE:
      return Object.assign({}, initialState)
    case UPDATE_LOGGED_IN_STATUS:
      return Object.assign({}, state, {loggedIn: action.payload})
    default:
      return state
  }
}

export default userAccountReducer

export function resetUserAccountState() {
  deleteToken()
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

export function submitCreateAccount(credentials) {
  return function(dispatch) {
    return postCreateAccount(credentials)
      .then( data => {
        if (data.errors) {
          dispatch(loadErrors(data.errors))
        } else if (data.loggedIn) {
          //TEST deletion of Errors
          dispatch(deleteErrors())
          dispatch(updateLoggedInStatus(true))
          saveToken(data.token)
        } else {
          dispatch(loadErrors(["Sorry, something went wrong with the server."]))
        }
      })
  }
}

export function saveToken(token) {
  window.localStorage.setItem(TINNDARP_TOKEN_KEY, token)
}

export function deleteToken() {
  if (window.localStorage.getItem(TINNDARP_TOKEN_KEY)) {
    window.localStorage.removeItem(TINNDARP_TOKEN_KEY)
  }
}

export function loggedInWithToken() {
  return !!window.localStorage.getItem(TINNDARP_TOKEN_KEY)
}
