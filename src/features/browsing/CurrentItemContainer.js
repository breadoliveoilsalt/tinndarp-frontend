import React from 'react'

function CurrentItemContainer(props) {

  if (props.currentItem != undefined) {
    const currentItem = props.currentItem

    return (
      <div>
        <p>Current Item:</p>
        <img className={"current-item"} src={currentItem.image_url} />
      </div>
    )
  }
}

export default CurrentItemContainer
