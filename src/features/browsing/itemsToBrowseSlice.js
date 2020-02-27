import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'

const initialState = {
  items: null,
  currentItem: null,
  currentItemIndex: 0
}

const itemsToBrowseSlice = createSlice({
  name: "itemsToBrowse",
  initialState,
  reducers: {
    loadItems(state, action) {
      state.items = action.payload
    },
    loadCurrentItem(state) {
      state.currentItem = state.items[state.currentItemIndex]
      state.currentItemIndex += 1
    }
  }
})

export const { loadItems, loadCurrentItem } = itemsToBrowseSlice.actions

export const { actions, reducer } = itemsToBrowseSlice

export default reducer

export function fetchItems() {
  return async function(dispatch) {
    const items = await requests.getItems()
    dispatch(loadItems(items))
    dispatch(loadCurrentItem())
  }
  
}
