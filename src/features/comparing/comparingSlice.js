// import * as requests from './browsingAPIRequests'
// import * as apiActions from '../apiRequests/apiRequestsSlice'

const LOAD_COMMON_ITEMS = 'LOAD_COMMON_ITEMS'
const LOAD_COMPARED_TO_USER = 'LOAD_COMPARED_TO_USER'
const RESET_COMPARING_STATE = 'RESET_COMPARING_STATE'

const initialState = {
  commonItems: null,
  comparedTo: null
}

function comparingReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMON_ITEMS:
      return Object.assign({}, state, {commonItems: action.payload})
    case LOAD_COMPARED_TO_USER:
      return Object.assign({}, state, {comparedTo: action.payload})
    case RESET_COMPARING_STATE:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}

export default comparingReducer

export function loadCommonItems(commonItems) {
  return {
    type: LOAD_COMMON_ITEMS, 
    payload: commonItems
  }
}
