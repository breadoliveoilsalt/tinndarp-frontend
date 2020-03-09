import React, { Component } from 'react'
import { connect } from 'react-redux'

class ErrorsDisplay extends Component {

  render() {
    const errorsDivs = this.props.errors.map((error, index) => {
      return (<div className="error" key={index + 1}> {error} </div>)
    })

   return (
     <div>
       <div>Sorry, the following errors occured:</div>
       {errorsDivs}
     </div>
   )
  }
}

const mapStateToProps = (state) => {
  return ({
    errors: state.apiRequest.errors
  })
}

export default connect(mapStateToProps)(ErrorsDisplay)
