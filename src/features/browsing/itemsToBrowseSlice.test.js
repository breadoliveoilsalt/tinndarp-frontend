import { configureStore } from '@reduxjs/toolkit'
import itemsToBrowseReducer, { loadItems, fetchItems } from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

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

      // describe("fetchItems", () => {
      //   expect(false).toBeTruthy()
      // })
    })
  })
})
