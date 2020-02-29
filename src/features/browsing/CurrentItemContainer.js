import React from 'react'

const CurrentItemContainer = (props) => {

  if (props.currentItem) {

    const currentItem = props.currentItem

    return (
      <div>
        <p>Current Item:</p>
        <img className={"current-item"}
          src={currentItem.image_url}
          alt={"current item"}
        />
      </div>
    )
  } else {
    return null
  }
}

export default CurrentItemContainer
