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
    it("has fields for fetchingItems and errors", () => {
      const expectedInitialState = {
        fetchingItems: false,
        errors: null
      }
      expect(store.getState().apiRequest).toEqual(expectedInitialState)
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadErrors()", () => {

      it("loads errors into the state", () => {
        const errors = ["Invalid email format", "Email too short"]
        expect(store.getState().userAccount.errors).toBeNull()

        dispatch(actions.loadErrors(errors))

        expect(store.getState().userAccount.errors).toEqual(errors)
      })

    })

    describe("deleteErrors()", () => {

      it("deletes errors from the state", () => {
        const errors = ["Invalid email format", "Email too short"]
        dispatch(actions.loadErrors(errors))
        expect(store.getState().userAccount.errors).toEqual(errors)

        dispatch(actions.deleteErrors())

        expect(store.getState().userAccount.errors).toBeNull()
      })

    })

    describe("updateFetchingStatus", () => {

      it("updates fetchingItems", () => {
        expect(store.getState().itemsToBrowse.fetchingItems).toEqual(true)

        dispatch(actions.updateFetchingStatus(false))

        expect(store.getState().itemsToBrowse.fetchingItems).toEqual(false)
      })

    })

  })

})
