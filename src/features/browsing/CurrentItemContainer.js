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
            src={currentItem.imageURL}
            alt={"current item"}
          />
        </div>

        <div className="browsing-item-details">
          {currentItem.name} <br/>
          {currentItem.description} <br/>
          ${currentItem.price} <br/>
          <a target="_blank" href={currentItem.moreInfoURL}> More Info </a>
        </div>

      </div>
    )
  }

  return content
}

export default CurrentItemContainer
