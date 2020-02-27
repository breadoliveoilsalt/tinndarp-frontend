import { createSlice, dispatch } from "@reduxjs/toolkit"
import { getItems } from "../../api/backendAPIRequests"

const itemsToBrowseSlice = createSlice({
  name: "items",
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
    const items = await getItems()
    dispatch(loadItems(items))
  }
}
