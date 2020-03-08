import configureStore from '../../configureStore'
import itemsToBrowseReducer, * as actions from './itemsToBrowseSlice'
import * as requests from  '../apiRequests/itemsAPIRequests'

describe("itemsToBrowse store slice", () => {

  let store
  let dispatch

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  describe("the inital state", () => {
    it("has fields for a list of items, a currentItem, and a currentItemIndex", () => {
      const expectedItemsToBrowseInitialState = {
        items: null,
        currentItem: null,
        fetchingItems: true
      }
      expect(store.getState().itemsToBrowse).toEqual(expectedItemsToBrowseInitialState)
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
          return dispatch(actions.fetchItems()).then(() => {
            expect(store.getState().apiRequest.fetchingItems).toBeFalsy()
          })

        })
      })
    })

    describe("updateCurrentItem()", () => {
      it("loads the first item as the currentItem", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))

        expect(store.getState().itemsToBrowse.currentItem).toBeNull()
        dispatch(actions.updateCurrentItem())

        expect(store.getState().itemsToBrowse.currentItem).toEqual("item 1")
      })

      it("does nothing if the items list is empty", () => {
        const itemsList = []
        dispatch(actions.loadItems(itemsList))

        expect(store.getState().itemsToBrowse.currentItem).toBeNull()
        dispatch(actions.updateCurrentItem())

        expect(store.getState().itemsToBrowse.currentItem).toBeNull()
      })
    })

    describe("removeCurrentItem()", () => {

      it("returns currentItem in the state to null", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))
        dispatch(actions.updateCurrentItem())

        expect(store.getState().itemsToBrowse.currentItem).toEqual("item 1")
        dispatch(actions.removeCurrentItem())

        expect(store.getState().itemsToBrowse.currentItem).toBeNull()
      })

      it("removes the first item in the items list", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))

        dispatch(actions.removeCurrentItem())

        expect(store.getState().itemsToBrowse.items).toEqual(["item 2"])
      })
    })
  })
})
