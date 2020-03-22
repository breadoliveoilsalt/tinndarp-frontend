import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemsInCommonWithAction } from './comparingSlice'

class ComparingContainer extends Component {

  componentDidMount() {
    this.props.getItemsInCommonWithAction()
  }

  render() {
    return (
      <div>
        You made it to the CompareContainer!
      </div>
    )
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemsInCommonWithAction: (params) => dispatch(getItemsInCommonWithAction(params))
  } 
}

export default connect(null, mapDispatchToProps)(ComparingContainer)