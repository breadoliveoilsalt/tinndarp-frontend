import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, removeCurrentItem, updateCurrentItem } from './browsingSlice'
import RedirectComponent from '../userAccount/RedirectComponent'
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
    this.props.removeCurrentItem()
    this.props.updateCurrentItem()
  }

  render() {
    if (this.props.errors) {
      return (
        <RedirectComponent
          text="Sorry, there were some errors. Please log in."
          redirectTo="/log_in"
          millisecondsToRedirect="2500"
        />
      )
    } else if (this.props.fetching) {
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
    items: state.browsing.items,
    currentItem: state.browsing.currentItem,
    fetching: state.apiRequest.fetching,
    errors: state.apiRequest.errors
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
