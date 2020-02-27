import { createSlice, dispatch } from '@reduxjs/toolkit'
import * as requests from '../../api/backendAPIRequests'

const itemsToBrowseSlice = createSlice({
  name: "itemsToBrowse",
  initialState: [],
  reducers: {
    loadItems: (state, action) => state = action.payload
  }
})

export const { loadItems } = itemsToBrowseSlice.actions

export const { actions, reducer } = itemsToBrowseSlice

export default reducer

export function fetchItems() {
  return async function(dispatch) {
    const items = await requests.getItems()
    dispatch(loadItems(items))
  }
}
