import React from 'react'

const DecisionButton = (props) => {

  return (
    <button
      className="decision-button"
      onClick={props.action}
    >
      {props.text}
    </button>
  )
}

export default DecisionButton
