import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, loadItems } from './itemsToBrowseSlice'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'

export class BrowsingContainer extends Component {


  componentDidMount() {
    this.props.fetchItems()
    this.props.loadItems("Hey there")
  }

  itemsAreLoaded() {
    return (this.props.items != null) && (this.props.items.length > 0)
  }

  render() {

    let content = null

    if (this.props.fetchingItems) {
      content = <Loader />
    } else if (this.itemsAreLoaded()) {
      content = <BrowsingContainer currentItem={this.props.currentItems} />
    }
    return content
  }
}
// const BrowsingContainer = () => {
//   console.log("Rendering")
//   const dispatch = useDispatch()
//   dispatch(fetchItems())
//   // useEffect(() => {
//   //   dispatch(fetchItems())
//   // })
//
//   let content = null
//
//   // let fetchingItems = false
//   let fetchingItems = useSelector(state => state.itemsToBrowse.fetchingItems, shallowEqual)
//
//   if (fetchingItems) {
//     content = <Loader />
//   }
//
//   return content
// }
// function BrowsingContainer() {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(fetchItems())
//   })
//
//   const items = useSelector(state => state.itemsToBrowse, shallowEqual)
//   let currentItem
//   let content = null
//   debugger
//
//   if (items != undefined || items == null) {
//       currentItem = items[0]
//       content = (
//         <div>
//           <CurrentItemContainer currentItem={currentItem} />
//         </div>
//       )
//   }
//
//   return content
// }

const mapStateToProps = (state) => {
  return {
    items: state.itemsToBrowse.items,
    currentItem: state.itemsToBrowse.currentItem,
    fetchingItems: state.itemsToBrowse.fetchingItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    loadItems: (items) => dispatch(loadItems(items))
    // loadError: (message) => dispatch(loadError(message)),
    // deleteError: () => dispatch(deleteError()),
    // beginBookAPIRequest: () => dispatch(beginBookAPIRequest()),
    // endBookAPIRequest: () => dispatch(endBookAPIRequest()),
    // loadSearchTerms: (searchTerms) => dispatch(loadSearchTerms(searchTerms)),
    // increaseSearchStartingID: () => dispatch(increaseSearchStartingID()),
    // clearPriorSearch: () => dispatch(clearPriorSearch()),
    // resetSearch: () => dispatch(resetSearch()),
    // getBookRecords: (apiRequest) => dispatch(getBookRecords(apiRequest))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
