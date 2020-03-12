import React from 'react'
import DecisionButton from './DecisionButton'

const CurrentItemContainer = ( {currentItem, handleNope, handleLike} ) => {

  let content = null

  if (currentItem) {
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
          <a href={currentItem.moreInfoURL} target="_blank" rel="noopener noreferrer"> More Info </a>
        </div>

        <div>
          <DecisionButton
            text="Nope"
            className="action-button nope-button"
            currentItem={currentItem}
            action={handleNope}
          />

          <DecisionButton
            text="Like"
            className="action-button like-button"
            currentItem={currentItem}
            action={handleLike}
          />
        </div>
      </div>
    )
  }

  return content
}

export default CurrentItemContainer
