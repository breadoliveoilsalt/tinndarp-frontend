import configureStore from '../../configureStore'
import accountReducer, * as actions from './userAccountSlice'
import * as requests from  '../apiRequests/itemsAPIRequests'


describe("userAccount state", () => {

  let store
  let dispatch

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  it("has an initial state with fields for logged_in and token", () => {
    const expectedUserAccountInitialState = {
      loggedIn: false,
      token: null
    }
    expect(store.getState().userAccount).toEqual(expectedUserAccountInitialState)
  })

  describe("the actions()", () => {

    describe("updateLoggedInStatus()", () => {

      it("updates whether the user is logged in", () => {
        expect(store.getState().userAccount.loggedIn).toEqual(false)

        dispatch(actions.updateLoggedInStatus(true))

        expect(store.getState().userAccount.loggedIn).toEqual(true)
      })

    })

    describe("addToken()", () => {

      it("sets the token state with the argument passed in", () => {
        expect(store.getState().userAccount.token).toEqual(null)

        const token = "xyz"
        dispatch(actions.addToken(token))

        expect(store.getState().userAccount.token).toEqual(token)
      })

    })

    describe("deleteToken()", () => {

      it("deletes the token in the state", () => {
        const token = "xyz"
        dispatch(actions.addToken(token))
        expect(store.getState().userAccount.token).toEqual(token)

        dispatch(actions.deleteToken())

        expect(store.getState().userAccount.token).toEqual(null)
      })

    })

  })

})
