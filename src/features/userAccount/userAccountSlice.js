import { postSignUp, postLogIn, getAuthenticateUserToken } from '../apiRequests/userAccountAPIRequests'
import * as apiActions from '../apiRequests/apiRequestsSlice'

const RESET_USER_ACCOUNT_STATE = 'RESET_USER_ACCOUNT_STATE'
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS'
const TINNDARP_TOKEN_KEY = 'tinndarp_token'

const initialState = {
  loggedIn: false
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

export function signUpAction(credentials) {
  return function(dispatch) {
    dispatch(apiActions.updateFetchingStatus(true))
    return postSignUp(credentials)
      .then( data => {
        if (data.errors) {
          dispatch(apiActions.loadErrors(data.errors))
        } else if (data.loggedIn === true) {
          dispatch(apiActions.deleteErrors())
          dispatch(updateLoggedInStatus(true))
          saveToken(data.token)
        } else {
          dispatch(apiActions.loadErrors(["Sorry, something went wrong with the server."]))
        }
      })
      .then(() => dispatch(apiActions.updateFetchingStatus(false)))
    }

}

export function logInAction(credentials) {
  return function(dispatch) {
    dispatch(apiActions.updateFetchingStatus(true))
    return postLogIn(credentials)
      .then( data => {
        if (data.errors) {
          dispatch(apiActions.loadErrors(data.errors))
        } else if (data.loggedIn === true) {
          dispatch(apiActions.deleteErrors())
          dispatch(updateLoggedInStatus(true))
          saveToken(data.token)
        } else {
          dispatch(apiActions.loadErrors(["Sorry, something went wrong with the server."]))
        }
      })
      .then(() => dispatch(apiActions.updateFetchingStatus(false)))
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

export function tokenPresent() {
  return !!window.localStorage.getItem(TINNDARP_TOKEN_KEY)
}

export function getToken() {
  if (window.localStorage.getItem(TINNDARP_TOKEN_KEY)) {
    return window.localStorage.getItem(TINNDARP_TOKEN_KEY)
  } else {
    return "null"
  }
}

//TEST
export function authenticateUserTokenAction() {
  return function(dispatch) {
    dispatch(apiActions.updateFetchingStatus(true))
    return getAuthenticateUserToken(getToken())
    .then( data => {
      if (data.loggedIn === true) {
        dispatch(updateLoggedInStatus(true))
      } else {
        dispatch(updateLoggedInStatus(false))
        deleteToken()
      }
    })
    .then( () => {
      dispatch(apiActions.updateFetchingStatus(false))
    })
  }
}
