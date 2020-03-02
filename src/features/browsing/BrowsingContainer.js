import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from './itemsToBrowseSlice'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'

export class BrowsingContainer extends Component {

  componentDidMount() {
    if (!this.props.items) {
      this.props.fetchItems()
    }
  }

  render() {

    if (this.props.fetchingItems) {
      return (<Loader />)
    } else if (this.props.items && this.props.items.length > 0){
      return <CurrentItemContainer currentItem={this.props.currentItem}/>
    } else
      return null
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
    fetchItems: () => dispatch(fetchItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
