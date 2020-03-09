import configureStore from '../../configureStore'
import apiRequestReducer, * as actions from './apiRequestSlice'

describe("apiRequestSlice", () => {

  let store
  let dispatch

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  describe("the inital state", () => {
    it("has fields for fetching and errors", () => {
      const expectedInitialState = {
        fetching: false,
        errors: null
      }
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

  })

})
