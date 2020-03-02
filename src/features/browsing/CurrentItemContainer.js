import React from 'react'

const CurrentItemContainer = (props) => {

  if (props.currentItem) {

    const currentItem = props.currentItem

    return (
      <div>

        <div className="browsing-instructions">
          Click "Like" or "Nope" Below to Rate the Item
        </ div>

        <div>
          <img
            className="browsing-item-image"
            src={currentItem.image_url}
            alt={"current item"}
          />
        </ div>

        <div className="browsing-item-details">
          {currentItem.name}
        </div>
      </ div>
    )
  } else {
    return null
  }
}

export default CurrentItemContainer
