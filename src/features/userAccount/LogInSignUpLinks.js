import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class LogInSignUpLinks extends Component {

  render(){
    return(
      <div>
        {/* // {this.props.errors ? <ErrorsDisplay errors={this.props.errors} /> : null}  */}
        <div className="large-text">Please log in or sign up.</div>
        <button className="action-button logo-style-button" onClick={() => this.props.history.push("/log_in")}>Log In</button>
        <button className="action-button logo-style-button" onClick={() => this.props.history.push("/sign_up")}>Sign Up</button>
     </div>
   )
  }
}

export default withRouter(LogInSignUpLinks)