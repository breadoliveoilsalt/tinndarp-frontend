import React from "react"
import { fetchItems } from "./itemsToBrowseSlice"
import { useSelector, useDispatch, shallowEqual } from "react-redux"

function BrowsingContainer() {
  const dispatch = useDispatch()
  dispatch(fetchItems())

  return (
    <div>
    </div>
  )
}

export default BrowsingContainer
