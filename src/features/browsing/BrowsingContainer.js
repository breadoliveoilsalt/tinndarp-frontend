import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, loadItems, updateFetchingStatus } from './itemsToBrowseSlice'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'

export class BrowsingContainer extends Component {

  constructor(props) {
     super(props);
     // this.props.fetchItems = this.props.fetchItems.bind(this)
     // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    if (!this.props.items) {
      this.props.fetchItems()
    }
  }

  itemsAreLoaded() {
    return (this.props.items != null) && (this.props.items.length > 0)
  }

  render() {

    let content = null

    // if (!this.props.items) {
    //   content = <Loader />
    // } else if (this.itemsAreLoaded()) {
    //   content = <BrowsingContainer currentItem={this.props.currentItems} />
    // }
    return content
  }
}

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
    loadItems: (items) => dispatch(loadItems(items)),
    updateFetchingStatus: (bool) => dispatch(updateFetchingStatus(bool))

    // dispatch -> just having this alone was causing loadItems to run and erase items field
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
