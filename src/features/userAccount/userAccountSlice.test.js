import configureStore from '../../configureStore'
import accountReducer, * as actions from './userAccountSlice'
import * as requests from  '../../api/backendAPIRequests'

const store = configureStore()
const dispatch = store.dispatch

describe("userAccount state", () => {

  beforeEach(() => {
    dispatch(actions.resetuserAccountState())
  })

  it("has an initial state with fields for logged_in and token", () => {
    const expectedUserAccountInitialState = {
      logged_in: false,
      token: null
    }
    expect(store.getState().userAccount).toEqual(expectedUserAccountInitialState)
  })

  describe("the actions", () => {

    describe("updateLoggedInStatus()", () => {

      it("updates whether the user is logged in", () => {
        expect(store.getState().userAccount.logged_in).toEqual(false)

        dispatch(updateLoggedInStatus(true))

        expect(store.getState().userAccount.logged_in).toEqual(true)
      })
    })
  })
})
