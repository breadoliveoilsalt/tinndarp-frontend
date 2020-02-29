import configureStore from '../../configureStore'
import itemsToBrowseReducer, * as actions from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as requests from  '../../api/backendAPIRequests'

const store = configureStore()
const dispatch = store.dispatch

describe("itemsToBrowse store slice", () => {

  beforeEach(() => {
    dispatch(actions.resetItemsToBrowseState())
  })

  describe("the inital state", () => {
    it("has fields for a list of items, a currentItem, and a currentItemIndex", () => {
      const expectedInitialState = {
        itemsToBrowse: {
          items: null,
          currentItem: null,
          fetchingItems: true
        }
      }
      expect(store.getState()).toEqual(expectedInitialState)
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadItems", () => {

      it("loads a list of items to the state", () => {
        const itemsList = ["item 1", "item 2"]

        dispatch(actions.loadItems(itemsList))

        expect(store.getState().itemsToBrowse.items).toEqual(itemsList)
      })

    })

    describe("updateFetchingStatus", () => {

      it("updates fetchingItems", () => {
        expect(store.getState().itemsToBrowse.fetchingItems).toEqual(true)

        dispatch(actions.updateFetchingStatus(false))

        expect(store.getState().itemsToBrowse.fetchingItems).toEqual(false)
      })

    })

    describe("fetchItems", () => {

      it("is a thunk that returns a function", () => {
        const result = actions.fetchItems()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        let mockGetItems
        const mockReturnedData = ["item 1", "item 2"]

        beforeEach(() => {
          requests.getItems = jest.fn()
          requests.getItems.mockReturnValueOnce(Promise.resolve(mockReturnedData))
        })

        it("calls getItems to request items from the backend server", () => {
          dispatch(actions.fetchItems())

          expect(requests.getItems.mock.calls.length).toEqual(1)
        })

        it("relies on dispatch to load the returned data to the store", () => {
          return dispatch(actions.fetchItems()).then(() => {
            expect(store.getState().itemsToBrowse.items).toEqual(mockReturnedData)
          })

        })

        it("leaves the fetchingItems state at false once complete", () => {
          expect(store.getState().itemsToBrowse.fetchingItems).toBeTruthy()
          return dispatch(actions.fetchItems()).then(() => {
            expect(store.getState().itemsToBrowse.fetchingItems).toBeFalsy()
          })

        })
      })
    })
  })
})
