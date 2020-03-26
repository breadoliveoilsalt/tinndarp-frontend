import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemsInCommonWithAction } from './comparingSlice'
import { getToken } from '../userAccount/userAccountSlice'
import Loader from '../../components/Loader'
import ErrorsDisplay from '../../components/ErrorsDisplay'


class ComparingContainer extends Component {

  componentDidMount() {
    const params = {
      token: getToken(),
      compare_to: "pipes@pipes.com"
    }
    this.props.getItemsInCommonWithAction(params)
  }

  render() {
    if (this.props.fetching) {
      return (<Loader />) 
    } else {
      const errorsDisplay = this.props.errors ? <ErrorsDisplay errors={this.props.errors} /> : null

      const generateCommonItemsList = () => {
        return this.props.commonItems.map( commonItemData => {
          return(<p> {JSON.stringify(commonItemData)}</p>)
        })
      }

      const commonItemsList = this.props.commonItems ? generateCommonItemsList() : null

      return (
        <div>
          {errorsDisplay}
          You made it to the CompareContainer!<br/>
          Compared To: {this.props.comparedTo}<br/>
          Common Items: <br/>
          {commonItemsList}
        </div>
      )
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