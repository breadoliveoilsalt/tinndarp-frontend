import configureStore from '../../configureStore'
import accountReducer, * as actions from './userAccountSlice'
import * as requests from  '../apiRequests/createAccountAPIRequest'

describe("userAccount state", () => {

  let store
  let dispatch
  const token_key = "tinndarp_token"

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  afterEach(() => {
    if (window.localStorage.getItem(token_key)) {
      window.localStorage.removeItem(token_key)
    }
  })

  it("has an initial state with fields for logged_in and token", () => {
    const expectedUserAccountInitialState = {
      loggedIn: false
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

        expect(window.localStorage.getItem(token_key)).toEqual(token)
      })

    })

    describe("deleteToken()", () => {

      it("deletes the token from local storage", () => {
        const token = "xyz"
        actions.saveToken(token)
        expect(window.localStorage.getItem(token_key)).toEqual(token)

        actions.deleteToken()

        expect(window.localStorage.getItem(token_key)).toBeNull()
      })

    })

    describe("submitCreateAccount()", () => {
      it("is a thunk that returns a function", () => {
        const result = actions.submitCreateAccount()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        beforeEach(() => {
          requests.postCreateAccount = jest.fn()
        })

        it("calls postCreateAccount()", () => {
          const mockReturnedData = {
            loggedIn: false,
            errors: null
          }
          requests.postCreateAccount.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          dispatch(actions.submitCreateAccount())

          expect(requests.postCreateAccount.mock.calls.length).toEqual(1)
        })

        it("updates the state regarding apiRequest errors if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Big problem"]
           }
          requests.postCreateAccount.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          return dispatch(actions.submitCreateAccount()).then(() => {
            expect(store.getState().apiRequest.errors).toEqual(["Big problem"])
          })
        })

        it("does not update the userAcount loggedIn state if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Big problem"]
           }
          requests.postCreateAccount.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.submitCreateAccount()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(false)
          })
        })

        it("updates the userAccount loggedIn state if the data returns a truthy logged in status", () => {
           const mockReturnedData = {
             loggedIn: true
           }
          requests.postCreateAccount.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.submitCreateAccount()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(true)
          })
        })

        it("saves the token locally", () => {
          const mockReturnedData = {
           loggedIn: true,
           token: "xyz"
          }
          requests.postCreateAccount.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(window.localStorage.getItem(token_key)).toBeNull

          return dispatch(actions.submitCreateAccount()).then(() => {
            expect(window.localStorage.getItem(token_key)).toEqual("xyz")
          })

        })

      })

    })

  })

})
