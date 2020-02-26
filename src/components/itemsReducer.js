import { createSlice, dispatch } from "@reduxjs/toolkit"
import { getItems } from "../api/backendAPIRequests"

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    loadItems: (state, action) => state = action.payload
  }

})

export const { loadItems } = itemsSlice.actions

export const { actions, reducer } = itemsSlice

export default reducer

// export const fetchItems = (dispatch){
export function fetchItems() {
  console.log("Items being fetched")
  return async function(dispatch) {
    const items = await getItems()
    dispatch(loadItems(items))
  }
}
