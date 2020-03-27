import React from 'react'

const ItemDisplay = ({ item }) => {

  return (
    <div> 
      <div>
        <img
          className="item-image"
          src={item.image_url}
          alt={"item"}
        />
      </div>

      <div className="item-info">
        {item.name} <br/>
        {item.description} <br/>
        ${item.price} <br/>
        <a href={item.more_info_url} target="_blank" rel="noopener noreferrer"> More Info </a>
      </div>
    </div>
  )
}

export default ItemDisplay