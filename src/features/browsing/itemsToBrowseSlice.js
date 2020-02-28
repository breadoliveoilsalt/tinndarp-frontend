import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'

const initialState = {
  items: null,
  currentItem: null,
  fetchingItems: true
}

const itemsToBrowseSlice = createSlice({
  name: "itemsToBrowse",
  initialState,
  reducers: {
    loadItems(state, action) {
      state.items = action.payload
    },
    loadCurrentItem(state) {
      state.currentItem = state.items[0]
    },
    updateFetchingStatus(state, action) {
      state.fetchingItems = action.payload
    }
  }
})

export const { loadItems, loadCurrentItem, updateFetchingStatus } = itemsToBrowseSlice.actions

export const { actions, reducer } = itemsToBrowseSlice

export default reducer

export function fetchItems() {
  console.log("fetching items")
  return async function(dispatch) {
    dispatch(updateFetchingStatus(true))
    const items = await requests.getItems()
    dispatch(loadItems(items))
    dispatch(updateFetchingStatus(false))
    dispatch(loadCurrentItem())
  }

}
