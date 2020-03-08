import React from 'react'
import './UserAccount.css'

const CreateAccountContainer = (props) => {
  return (
    <div className="large-text">

      <div classname="large-text">Sign Up for an Account! </ div>

      <form onSubmit={props.handleCreateAccount}>
        <div>
          <input type="text" placeholder="Your email" name="email" />
        </div>
        <div>
          <input type="password" placeholder="Your password" name="password" />
        </div>
        <div>
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>

    </div>
  )
}

export default CreateAccountContainer
