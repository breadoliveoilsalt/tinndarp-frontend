const defaultState = 0

function feature1Reducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'SUBTRACT':
      return state - 1
    default:
      return state
  }
}

export default feature1Reducer
