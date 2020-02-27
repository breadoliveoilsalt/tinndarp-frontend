import { configureStore } from '@reduxjs/toolkit'
import itemsToBrowseReducer, { loadItems, fetchItems } from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as requests from  "../../api/backendAPIRequests"

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

          it("calls getItems to request items from the backend server", () => {
            let mockGetItems = jest.fn()
            requests.getItems = mockGetItems
            const mockReturnedData = ["item 1", "item 2"]
            mockGetItems.mockReturnValueOnce(Promise.resolve(mockReturnedData))
            const returnedFunction = fetchItems
            debugger
            returnedFunction(dispatch)

            expect(mockGetItems.mock.calls.length).toEqual(1)
          })
        })
      })
    })
  })
})
