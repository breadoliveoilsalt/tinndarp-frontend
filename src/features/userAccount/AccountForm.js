import React from 'react'

const CreateAccountForm = (props) => {
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
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>

    </div>
  )
}

export default CreateAccountForm