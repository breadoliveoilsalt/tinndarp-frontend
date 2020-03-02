import React from 'react'

const CurrentItemContainer = (props) => {

  let content = null

  if (props.currentItem) {
    const currentItem = props.currentItem
    content = (
      <div>

        <div className="browsing-instructions">
          Click "Like" or "Nope" Below to Rate the Item
        </div>

        <div>
          <img
            className="browsing-item-image"
            src={currentItem.image_url}
            alt={"current item"}
          />
        </div>

        <div className="browsing-item-details">
          {currentItem.name} <br/>
          $ {currentItem.price} <br/>
          {currentItem.description} <br/>
        </div>

      </div>
    )
  }

  return content
}

export default CurrentItemContainer
