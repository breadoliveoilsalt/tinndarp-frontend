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

    describe("saveToken())", () => {

      it("saves the token to local storage with a key equal to 'tinndarp_token'", () => {
        const token = "xyz"
        actions.saveToken(token)

        expect(window.localStorage.getItem('tinndarp_token')).toEqual(token)

        window.localStorage.removeItem(token)
      })

    })

    describe("deleteToken()", () => {

      it("deletes the token from local storage", () => {
        const token = "xyz"
        actions.saveToken(token)
        expect(window.localStorage.getItem('tinndarp_token')).toEqual(token)

        actions.deleteToken()

        expect(window.localStorage.getItem('tinndarp_token')).toBeNull()
      })

    })

  })

})
