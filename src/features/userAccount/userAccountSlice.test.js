import configureStore from '../../configureStore'
import accountReducer, * as actions from './userAccountSlice'
import * as requests from  './userAccountAPIRequests'
import * as apiActions from '../apiRequests/apiRequestsSlice'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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

    describe("tokenPresent()", () => {

      it("returns true if there is a token saved locally", () => {
        const token = "xyz"
        actions.saveToken(token)

        expect(actions.tokenPresent()).toEqual(true)
      })


      it("returns false if there is not a token saved locally", () => {
        expect(actions.tokenPresent()).toEqual(false)
      })
    })

    describe("signUpAction()", () => {
      it("is a thunk that returns a function", () => {
        const result = actions.signUpAction()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        beforeEach(() => {
          requests.postSignUp = jest.fn()
        })

        it("calls postSignUp()", () => {
          const mockReturnedData = {
            loggedIn: false,
            errors: null
          }
          requests.postSignUp.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          dispatch(actions.signUpAction())

          expect(requests.postSignUp.mock.calls.length).toEqual(1)
        })

        it("updates the state regarding apiRequest errors if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Big problem"]
           }
          requests.postSignUp.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          return dispatch(actions.signUpAction()).then(() => {
            expect(store.getState().apiRequest.errors).toEqual(["Big problem"])
          })
        })

        it("does not update the userAcount loggedIn state if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Big problem"]
           }
          requests.postSignUp.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.signUpAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(false)
          })
        })

        it("updates the userAccount loggedIn state if the data returns a truthy logged in status", () => {
           const mockReturnedData = {
             loggedIn: true
           }
          requests.postSignUp.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.signUpAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(true)
          })
        })

        it("saves the token locally", () => {
          const mockReturnedData = {
           loggedIn: true,
           token: "xyz"
          }
          requests.postSignUp.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(window.localStorage.getItem(token_key)).toBeNull

          return dispatch(actions.signUpAction()).then(() => {
            expect(window.localStorage.getItem(token_key)).toEqual("xyz")
          })

        })

      })

    })

    describe("logInAction()", () => {
      it("is a thunk that returns a function", () => {
        const result = actions.logInAction()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        beforeEach(() => {
          requests.postLogIn = jest.fn()
        })

        it("calls postLogIn()", () => {
          const mockReturnedData = {
            loggedIn: false,
            errors: null
          }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          dispatch(actions.logInAction())

          expect(requests.postLogIn.mock.calls.length).toEqual(1)
        })

      it("updates the apiRequest fetching state to true when first called and updates the apiFetching state when the promise chain is over", () => {
           const mockReturnedData = {
             errors: ["Invalid log in credentials."]
           }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          const mockStore = configureMockStore([thunk])
          store = mockStore({apiRequest: {fetching: false}})
          dispatch = store.dispatch

          return dispatch(actions.logInAction()).then(() => {
            expect(store.getActions()[0]).toEqual(apiActions.updateFetchingStatus(true))
            const lastAction = store.getActions()[store.getActions().length - 1]
            expect(lastAction).toEqual(apiActions.updateFetchingStatus(false))
          })
        })

        it("updates the state regarding apiRequest errors if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Invalid log in credentials."]
           }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          return dispatch(actions.logInAction()).then(() => {
            expect(store.getState().apiRequest.errors).toEqual(mockReturnedData.errors)
          })
        })

        it("does not update the userAcount loggedIn state if the data returns errors", () => {
           const mockReturnedData = {
             errors: ["Invalid log in credentials."]
           }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.logInAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(false)
          })
        })

        it("updates the userAccount loggedIn state if the data returns a truthy logged in status", () => {
           const mockReturnedData = {
             loggedIn: true
           }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.logInAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(true)
          })
        })

        it("saves the token locally", () => {
          const mockReturnedData = {
           loggedIn: true,
           token: "xyz"
          }
          requests.postLogIn.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(window.localStorage.getItem(token_key)).toBeNull

          return dispatch(actions.logInAction()).then(() => {
            expect(window.localStorage.getItem(token_key)).toEqual("xyz")
          })

        })

      })

    })


    describe("authenticateUserTokenAction()", () => {
      it("is a thunk that returns a function", () => {
        const result = actions.logInAction()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        beforeEach(() => {
          requests.getAuthenticateUserToken = jest.fn()
        })

        it("calls getAuthenticateUserToken()", () => {
          const mockReturnedData = {
            loggedIn: false,
            errors: null
          }
          requests.getAuthenticateUserToken.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          dispatch(actions.authenticateUserTokenAction())

          expect(requests.getAuthenticateUserToken.mock.calls.length).toEqual(1)
        })

        it("updates the apiRequest fetching state to true when first called and updates the apiFetching state when the promise chain is over", () => {
           const mockReturnedData = {
             loggedIn: false,
             errors: ["Invalid token."]

           }
          requests.getAuthenticateUserToken.mockReturnValueOnce(Promise.resolve(mockReturnedData))

          const mockStore = configureMockStore([thunk])
          store = mockStore({apiRequest: {fetching: false}})
          dispatch = store.dispatch

          return dispatch(actions.authenticateUserTokenAction()).then(() => {
            expect(store.getActions()[0]).toEqual(apiActions.updateFetchingStatus(true))
            const lastAction = store.getActions()[store.getActions().length - 1]
            expect(lastAction).toEqual(apiActions.updateFetchingStatus(false))
          })
        })

        it("updates the userAccount loggedIn state if the data returns a truthy logged in status", () => {
           const mockReturnedData = {
             loggedIn: true
           }
          requests.getAuthenticateUserToken.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.authenticateUserTokenAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(true)
          })
        })

        it("leaves the userAccount loggedIn state as false if the data returns a falsey logged in status", () => {
           const mockReturnedData = {
             loggedIn: false
           }
          requests.getAuthenticateUserToken.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(store.getState().userAccount.loggedIn).toEqual(false)

          return dispatch(actions.authenticateUserTokenAction()).then(() => {
            expect(store.getState().userAccount.loggedIn).toEqual(false)
          })
        })

        it("saves the token locally", () => {
          const token_key = "tinndarp_token"
          window.localStorage.setItem(token_key, "xyz")
          const mockReturnedData = {
           loggedIn: false,
          }
          requests.getAuthenticateUserToken.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          expect(window.localStorage.getItem(token_key)).toEqual("xyz")

          return dispatch(actions.authenticateUserTokenAction()).then(() => {
            expect(window.localStorage.getItem(token_key)).toBeNull()
          })
        })

      })

    })

  })

})
