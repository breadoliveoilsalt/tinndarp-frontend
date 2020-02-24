const defaultState = 2

function feature2Reducer(state = defaultState, action) {
  switch (action.type) {
    case 'MULTIPLE':
      return state * 2
    case 'DIVIDE':
      return state / 2
    default:
      return state
  }
}

export default feature2Reducer
