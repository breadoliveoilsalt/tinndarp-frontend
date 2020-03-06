const RESET_USER_ACCOUNT_STATE = 'RESET_USER_ACCOUNT_STATE'
const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS'

const initialState = {
  loggedIn: false,
  token: null
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
