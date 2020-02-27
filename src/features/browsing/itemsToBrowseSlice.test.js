import { configureStore } from '@reduxjs/toolkit'
import itemsToBrowseReducer, { loadItems, fetchItems } from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as requests from  '../../api/backendAPIRequests'

const store = configureStore({
  reducer: itemsToBrowseReducer
})

const dispatch = store.dispatch

describe("itemsToBrowse store slice", () => {

  describe("the inital state", () => {
    it("is equal to an empty array", () => {
      expect(store.getState()).toEqual([])
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadItems", () => {
      it("loads a list of items to the state", () => {
        const itemsList = ["item 1", "item 2"]

        dispatch(loadItems(itemsList))

        expect(store.getState()).toEqual(itemsList)
      })

      describe("fetchItems", () => {

        it("is a thunk that returns a function", () => {
          const result = fetchItems()

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
            const returnedFunction = fetchItems()

            returnedFunction(dispatch)

            expect(mockGetItems.mock.calls.length).toEqual(1)
          })

          it("relies on dispatch to load the returned data to the store", () => {
            const returnedFunction = fetchItems()

            returnedFunction(dispatch)

            expect(store.getState()).toEqual(mockReturnedData)
          })
        })
      })
    })
  })
})
