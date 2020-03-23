import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemsInCommonWithAction } from './comparingSlice'
import Loader from '../../components/Loader'
import ErrorsDisplay from 'components/ErrorsDisplay'

class ComparingContainer extends Component {

  componentDidMount() {
    this.props.getItemsInCommonWithAction()
  }

  render() {
    if (this.props.errors) {
      return null
    }
    else if (this.props.fetching) {
      return <Loader /> 
    } else {
      return (
        <div>
          You made it to the CompareContainer!
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.apiRequest.fetching,
    errors: state.apiRequest.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemsInCommonWithAction: (params) => dispatch(getItemsInCommonWithAction(params))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparingContainer)