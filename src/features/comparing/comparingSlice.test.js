import configureStore from '../../configureStore'
import * as actions from './ComparingSlice'
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

      it("populates the state's commonItems with it's argument", () => {
        const commonItems = ["item 1", "item 2"]
        expect(store.getState().comparing.commonItems).toEqual(null)

        dispatch(actions.loadCommonItems(commonItems))

        expect(store.getState().comparing.commonItems).toEqual(commonItems)
      })

    })
  })
})