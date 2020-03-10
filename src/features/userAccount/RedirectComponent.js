import React from 'react'
import Loader from '../apiRequests/Loader'

const RedirectComponent = (props) => {

  return (
    <div>
      <p>{props.text}</p>

      <Loader />
    </div>
  )

}
export default RedirectComponent
