import React from 'react'
import { fetchItems } from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'

function BrowsingContainer() {
  const dispatch = useDispatch()
  dispatch(fetchItems())

  return (
    <div>
      <CurrentItemContainer />
    </div>
  )
}

export default BrowsingContainer
