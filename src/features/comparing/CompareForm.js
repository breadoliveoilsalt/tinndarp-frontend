import React from 'react'

const CompareForm = ({ action }) => {
  return (
    <div>
      <div>Enter an email to compare liked furniture with another user!</div>
      <form onSubmit={action}>
        <div>
          <input type="text" placeholder="Other user's email" name="email" />
        </div>
        <div>
          <input className="action-button submit-button" type="submit" value="Submit" />
        </div>
      </form>

    </div>
  )
}

export default CompareForm