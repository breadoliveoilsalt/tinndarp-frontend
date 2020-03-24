import React, { Component } from 'react'
// import { connect } from 'react-redux'

class ErrorsDisplay extends Component {

  render() {
    const errorsDivs = this.props.errors.map((error, index) => {
      return (<div className="error" key={index}>{error}</div>)
    })

   return (
     <div className="errors-container">
       <div>Sorry, the following errors occured:</div>
       {errorsDivs}
     </div>
   )
  }
}

export default ErrorsDisplay

// const mapStateToProps = (state) => {
//   return ({
//     errors: state.apiRequest.errors
//   })
// }

// export default connect(mapStateToProps)(ErrorsDisplay)
