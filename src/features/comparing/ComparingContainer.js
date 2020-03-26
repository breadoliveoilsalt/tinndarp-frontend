import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemsInCommonWithAction } from './comparingSlice'
import { getToken } from '../userAccount/userAccountSlice'
import Loader from '../../components/Loader'
import ComparingTool from './ComparingTool'
import './ComparingContainer.css'

class ComparingContainer extends Component {

  componentDidMount() {
    const params = {
      token: getToken(),
      compare_to: "timmy@timmy.com"
    }
    this.props.getItemsInCommonWithAction(params)
  }

  render() {
    if (this.props.fetching) {
      return <Loader /> 
    } else {
      return <ComparingTool 
        errors={this.props.errors}
        commonItems={this.props.commonItems}
        comparedTo={this.props.comparedTo}
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
    getItemsInCommonWithAction: (params) => dispatch(getItemsInCommonWithAction(params))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparingContainer)