import React from 'react'

const AccountForm = (props) => {
  return (
    <div>

      <form onSubmit={props.action}>
        <div>
          <input type="text" placeholder="Your email" name="email" />
        </div>
        <div>
          <input type="password" placeholder="Your password" name="password" />
        </div>
        <div>
          <input className="action-button submit-button" type="submit" value="Submit" />
        </div>
      </form>

    </div>
  )
}

export default AccountForm
