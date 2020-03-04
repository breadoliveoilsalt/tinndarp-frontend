import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, removeCurrentItem, updateCurrentItem } from './itemsToBrowseSlice'
import Loader from '../../components/Loader'
import CurrentItemContainer from './CurrentItemContainer'
import FinishedBrowsingDisplay from './FinishedBrowsingDisplay'
import './BrowsingContainer.css'

export class BrowsingContainer extends Component {

  constructor(props) {
    super(props)
    this.handleNope = this.handleNope.bind(this)
    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    if (!this.props.items) {
      this.props.fetchItems()
    }
  }

  handleNope() {
    this.props.removeCurrentItem()
    this.props.updateCurrentItem()
  }

  handleLike() {

  }

  render() {
    if (this.props.fetchingItems) {
      return (<Loader />)
    } else if (this.props.items && this.props.items.length > 0){
      return (
        <CurrentItemContainer
          currentItem={this.props.currentItem}
          handleNope={this.handleNope}
          handleLike={this.handleLike}
        />
      )
    } else
      return <FinishedBrowsingDisplay />
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
    removeCurrentItem: () => dispatch(removeCurrentItem()),
    updateCurrentItem: () => dispatch(updateCurrentItem())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
