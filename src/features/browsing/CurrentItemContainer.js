import React from 'react'
import ItemDisplay from '../../components/ItemDisplay'
import DecisionButton from './DecisionButton'

const CurrentItemContainer = ( {currentItem, handleNope, handleLike} ) => {
 
  let content = null

  if (currentItem) {
    content = (
      <div>

        <div className="browsing-instructions">
          Click "Like" or "Nope" Below to Rate the Item
        </div>

        <ItemDisplay item={currentItem} />

        <div className="browsing-button-container">
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
