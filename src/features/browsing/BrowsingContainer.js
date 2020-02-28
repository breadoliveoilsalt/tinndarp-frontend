import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, loadItems, updateFetchingStatus } from './itemsToBrowseSlice'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'

export class BrowsingContainer extends Component {

  constructor(props) {
     super(props);
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

    if (!this.props.items) {
      return (<Loader />)
    } else {
      return <CurrentItemContainer currentItem={this.props.currentItem}/>
    }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
