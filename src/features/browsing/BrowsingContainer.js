import React, { useEffect } from 'react'
import { fetchItems } from './itemsToBrowseSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'

function BrowsingContainer() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  })

  const items = useSelector(state => state.itemsToBrowse.itemsList)
  let currentItem
  let content = null

  if (items != undefined) {
      currentItem = items[0]
      content = (
        <div>
          <CurrentItemContainer currentItem={currentItem} />
        </div>
      )
  }

  return content
}

export default BrowsingContainer
