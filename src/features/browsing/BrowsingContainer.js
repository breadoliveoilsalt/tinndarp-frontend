import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, removeCurrentItem, updateCurrentItem, postBrowsingDecisionAction } from './browsingSlice'
import { getToken } from '../userAccount/userAccountSlice'
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
      const params = {token: getToken()}
      this.props.fetchItems(params)
    }
  }

  handleLike() {
    this.props.postBrowsingDecisionAction(
      { token: getToken(),
        item_id: this.props.currentItem.id,
        liked: "true" }
    )
  }

  handleNope() {
    this.props.postBrowsingDecisionAction(
      { token: getToken(),
        item_id: this.props.currentItem.id,
        liked: "false" }
    )
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
    fetchItems: (params) => dispatch(fetchItems(params)),
    removeCurrentItem: () => dispatch(removeCurrentItem()),
    updateCurrentItem: () => dispatch(updateCurrentItem()),
    postBrowsingDecisionAction: (params) => dispatch(postBrowsingDecisionAction(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
