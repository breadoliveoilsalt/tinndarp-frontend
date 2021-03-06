import configureStore from '../../configureStore'
import * as actions from './browsingSlice'
import * as apiActions from '../apiRequests/apiRequestsSlice'
import * as requests from  './browsingAPIRequests'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe("browsing store slice", () => {

  let store
  let dispatch

  beforeEach(() => {
    store = configureStore()
    dispatch = store.dispatch
  })

  describe("the inital state", () => {
    it("has fields for a list of items, a currentItem, and a currentItemIndex", () => {
      const expectedbrowsingInitialState = {
        items: null,
        currentItem: null
      }
      expect(store.getState().browsing).toEqual(expectedbrowsingInitialState)
    })
  })

  describe("the actions to dispatch", () => {

    describe("loadItems", () => {

      it("loads a list of items to the state", () => {
        const itemsList = ["item 1", "item 2"]

        dispatch(actions.loadItems(itemsList))

        expect(store.getState().browsing.items).toEqual(itemsList)
      })

    })

    describe("fetchItems", () => {

      it("is a thunk that returns a function", () => {
        const result = actions.fetchItems()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        const mockReturnedData = ["item 1", "item 2"]

        beforeEach(() => {
          requests.getItemsToBrowse = jest.fn()
          requests.getItemsToBrowse.mockReturnValueOnce(Promise.resolve(mockReturnedData))
        })

        afterEach(() => {
          requests.getItemsToBrowse.mockRestore()
        })

        it("calls getItemsToBrowse to request items from the backend server", () => {
          dispatch(actions.fetchItems())

          expect(requests.getItemsToBrowse.mock.calls.length).toEqual(1)
        })

        it("relies on dispatch to load the returned data to the store", () => {
          return dispatch(actions.fetchItems()).then(() => {
            expect(store.getState().browsing.items).toEqual(mockReturnedData)
          })

        })

        it("leaves the fetchings state at false once complete", () => {
          return dispatch(actions.fetchItems()).then(() => {
            expect(store.getState().apiRequest.fetchings).toBeFalsy()
          })

        })
      })
    })


    describe("updateCurrentItem()", () => {

      it("loads the first item as the currentItem", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))

        expect(store.getState().browsing.currentItem).toBeNull()
        dispatch(actions.updateCurrentItem())

        expect(store.getState().browsing.currentItem).toEqual("item 1")
      })

      it("does nothing if the items list is empty", () => {
        const itemsList = []
        dispatch(actions.loadItems(itemsList))

        expect(store.getState().browsing.currentItem).toBeNull()
        dispatch(actions.updateCurrentItem())

        expect(store.getState().browsing.currentItem).toBeNull()
      })

    })

    describe("removeCurrentItem()", () => {

      it("returns currentItem in the state to null", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))
        dispatch(actions.updateCurrentItem())

        expect(store.getState().browsing.currentItem).toEqual("item 1")
        dispatch(actions.removeCurrentItem())

        expect(store.getState().browsing.currentItem).toBeNull()
      })

      it("removes the first item in the items list", () => {
        const itemsList = ["item 1", "item 2"]
        dispatch(actions.loadItems(itemsList))

        dispatch(actions.removeCurrentItem())

        expect(store.getState().browsing.items).toEqual(["item 2"])
      })
    })

    describe("postBrowsingDecisionAction()", () => {

      const params = { token: "xyz", item_id: "1", liked: true }

      beforeEach(() => {
        requests.postBrowsingDecision = jest.fn()

        const mockStore = configureMockStore([thunk])
        store = mockStore({
          apiRequest: {
            fetching: false
          }
        })
        dispatch = store.dispatch
      })

      afterEach(() => {
        requests.postBrowsingDecision.mockRestore()
      })

      it("is a thunk that returns a function", () => {
        const mockReturnData = {data: {saved: "true"}}
        requests.postBrowsingDecision.mockResolvedValue(mockReturnData)
        const result = actions.postBrowsingDecisionAction()

        expect(typeof result === "function").toBeTruthy()
      })

      describe("the returned function", () => {

        it("calls the postBrowsingDecision request", () => {
          const mockReturnData = {data: {saved: "true"}}
          requests.postBrowsingDecision.mockResolvedValue(mockReturnData)
          dispatch(actions.postBrowsingDecisionAction(params))

          expect(requests.postBrowsingDecision.mock.calls.length).toEqual(1)
        })

        it("loads errors if postBrowsingDecision returns an errors field", () => {
          const mockReturnData = {errors: "Something went wrong"}
          requests.postBrowsingDecision.mockResolvedValue(mockReturnData)

          return dispatch(actions.postBrowsingDecisionAction(params))
            .then(() => {
              expect(store.getActions()).toContainEqual(apiActions.loadErrors(mockReturnData.errors))
            })
        })

        it("removes the current item in the state if postBrowsingDecision returns no errors", () => {
          const mockReturnData = {}
          requests.postBrowsingDecision.mockResolvedValue(mockReturnData)

          return dispatch(actions.postBrowsingDecisionAction(params))
            .then(() => {
              expect(store.getActions()).toContainEqual(actions.removeCurrentItem())
            })
        })

        it("updates the current item in the state if postBrowsingDecision returns no errors", () => {
          const mockReturnData = {}
          requests.postBrowsingDecision.mockResolvedValue(mockReturnData)

          return dispatch(actions.postBrowsingDecisionAction(params))
            .then(() => {
              expect(store.getActions()).toContainEqual(actions.updateCurrentItem())
            })
        })

      })
      
    })
  })
})
