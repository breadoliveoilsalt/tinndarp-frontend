import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ErrorsDisplay from '../../components/ErrorsDisplay'

class LogInSignUpLinks extends Component {

  render(){
    return(
      <div>
        {this.props.errors ? <ErrorsDisplay /> : null} 
        <div className="large-text">Please log in or sign up.</div>
        <button className="action-button logo-style-button" onClick={() => this.props.history.push("/log_in")}>Log In</button>
        <button className="action-button logo-style-button" onClick={() => this.props.history.push("/sign_up")}>Sign Up</button>
     </div>
   )
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.apiRequest.errors
  }
}

export default connect(mapStateToProps)(withRouter(LogInSignUpLinks))
