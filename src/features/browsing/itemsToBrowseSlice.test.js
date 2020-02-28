import { configureStore } from '@reduxjs/toolkit'
import itemsToBrowseReducer, * as actions from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as requests from  '../../api/backendAPIRequests'

const store = configureStore({
  reducer: itemsToBrowseReducer
})

const dispatch = store.dispatch

describe("itemsToBrowse store slice", () => {

  describe("the inital state", () => {
    it("has fields for a list of items, a currentItem, and a currentItemIndex", () => {
      const expectedInitialState = {
        items: null,
        currentItem: null,
        fetchingItems: true
      }
      expect(store.getState()).toEqual(expectedInitialState)
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadItems", () => {
      it("loads a list of items to the state", () => {
        const itemsList = ["item 1", "item 2"]

        dispatch(actions.loadItems(itemsList))

        expect(store.getState().items).toEqual(itemsList)
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
            mockGetItems = jest.fn()
            requests.getItems = mockGetItems
            mockGetItems.mockReturnValueOnce(Promise.resolve(mockReturnedData))
          })


          it("calls getItems to request items from the backend server", () => {
            const returnedFunction = actions.fetchItems()

            returnedFunction(dispatch)

            expect(mockGetItems.mock.calls.length).toEqual(1)
          })

          it("relies on dispatch to load the returned data to the store", () => {
            const returnedFunction = actions.fetchItems()

            returnedFunction(dispatch)

            expect(store.getState().items).toEqual(mockReturnedData)
          })

          it("leaves the fetchingItems state at false once complete", () => {

          })
        })
      })
    })
  })
})
