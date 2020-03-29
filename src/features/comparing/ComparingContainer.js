import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemsInCommonWithAction } from './comparingSlice'
import { getToken } from '../userAccount/userAccountSlice'
import { deleteErrors } from '../apiRequests/apiRequestsSlice'
import Loader from '../../components/Loader'
import ComparingDisplay from './ComparingDisplay'
import './ComparingContainer.css'

class ComparingContainer extends Component {

  constructor(props) {
    super(props)
    this.handleComparison = this.handleComparison.bind(this)
  }

  componentDidMount() {
  
  }

  handleComparison(event) {
    event.preventDefault()
    this.props.deleteErrors()
    const params = {
      token: getToken(),
      compare_to: event.target.email.value
    }
    this.props.getItemsInCommonWithAction(params)
  }

  render() {
    if (this.props.fetching) {
      return <Loader /> 
    } else {
      return <ComparingDisplay 
        errors={this.props.errors}
        commonItems={this.props.commonItems}
        comparedTo={this.props.comparedTo}
        handleComparison={this.handleComparison}
      />
    }
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.apiRequest.fetching,
    errors: state.apiRequest.errors,
    commonItems: state.comparing.commonItems,
    comparedTo: state.comparing.comparedTo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemsInCommonWithAction: (params) => dispatch(getItemsInCommonWithAction(params)),
    deleteErrors: () => dispatch(deleteErrors)
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparingContainer)