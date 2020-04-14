import configureStore from '../../configureStore'
import * as actions from './comparingSlice'
import * as apiActions from '../apiRequests/apiRequestsSlice'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe("userAccount state", () => {

  let store
  let dispatch
  const token_key = "tinndarp_token"

  describe("the basic actions", () => {

    beforeEach(() => {
      store = configureStore()
      dispatch = store.dispatch
    })

    afterEach(() => {
      if (window.localStorage.getItem(token_key)) {
        window.localStorage.removeItem(token_key)
      }
    })

    describe("loadCommonItems()", () => {

      it("populates the state's commonItems with its argument", () => {
        const commonItems = ["item 1", "item 2"]
        expect(store.getState().comparing.commonItems).toEqual(null)

        dispatch(actions.loadCommonItems(commonItems))

        expect(store.getState().comparing.commonItems).toEqual(commonItems)
      })

    })

    describe("loadComparedToUser()", () => {

      it("populates the state's comparedTo field with its argument", () => {
        const comparedToUserEmail = "timmy@timmy.com"
        expect(store.getState().comparing.comparedTo).toEqual(null)

        dispatch(actions.loadComparedToUser(comparedToUserEmail))

        expect(store.getState().comparing.comparedTo).toEqual(comparedToUserEmail)
      })

    })

    describe("resetComparingState()", () => {

      it("resets the comparing state fields to null", () => {
        const commonItems = ["item 1", "item 2"]
        const comparedToUserEmail = "timmy@timmy.com"
        dispatch(actions.loadCommonItems(commonItems))
        dispatch(actions.loadComparedToUser(comparedToUserEmail))
        expect(store.getState().comparing.commonItems).toEqual(commonItems)
        expect(store.getState().comparing.comparedTo).toEqual(comparedToUserEmail)

        dispatch(actions.resetComparingState())

        expect(store.getState().comparing.commonItems).toEqual(null)
        expect(store.getState().comparing.comparedTo).toEqual(null)
      })

    })
    
  })
})