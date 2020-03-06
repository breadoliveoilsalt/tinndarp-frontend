const RESET_USER_ACCOUNT_STATE = 'RESET_USER_ACCOUNT_STATE'

const initialState = {
  logged_in: false,
  token: null
}

function userAccountReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_USER_ACCOUNT_STATE:
      return Object.assign({}, initialState)
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
