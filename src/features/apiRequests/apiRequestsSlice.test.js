import configureStore from '../../configureStore'
import apiRequestsReducer, * as actions from './apiRequestsSlice'

describe("apiRequestsSlice", () => {

  const expectedInitialState = {
    fetching: false,
    errors: null
  }

  let store
  let dispatch

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  describe("the inital state", () => {
    it("has fields for fetching and errors", () => {
      expect(store.getState().apiRequest).toEqual(expectedInitialState)
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadErrors()", () => {

      it("loads errors into the state", () => {
        const errors = ["Invalid email format", "Email too short"]
        expect(store.getState().apiRequest.errors).toBeNull()

        dispatch(actions.loadErrors(errors))

        expect(store.getState().apiRequest.errors).toEqual(errors)
      })

    })

    describe("deleteErrors()", () => {

      it("deletes errors from the state", () => {
        const errors = ["Invalid email format", "Email too short"]
        dispatch(actions.loadErrors(errors))
        expect(store.getState().apiRequest.errors).toEqual(errors)

        dispatch(actions.deleteErrors())

        expect(store.getState().apiRequest.errors).toBeNull()
      })

    })

    describe("updateFetchingStatus", () => {

      it("updates fetching", () => {
        expect(store.getState().apiRequest.fetching).toEqual(false)

        dispatch(actions.updateFetchingStatus(true))

        expect(store.getState().apiRequest.fetching).toEqual(true)
      })

    })

    describe("resetAPIRequestState()", () => {

      it("resets the state back to its initial state", () => {
        expect(store.getState().apiRequest).toEqual(expectedInitialState)

        dispatch(actions.updateFetchingStatus(true))
        const errors = ["bad stuff", "hold on!"]
        dispatch(actions.loadErrors(errors))

        expect(store.getState().apiRequest.fetching).toEqual(true)
        expect(store.getState().apiRequest.errors).toEqual(errors)

        dispatch(actions.resetAPIRequestState())
        expect(store.getState().apiRequest).toEqual(expectedInitialState)
      })
    })

  })

})
