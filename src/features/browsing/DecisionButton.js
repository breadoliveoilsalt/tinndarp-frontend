import React from 'react'

const DecisionButton = (props) => {

  return (
    <button
      className={props.className}
      onClick={props.action}
    >
      {props.text}
    </button>
  )
}

export default DecisionButton
