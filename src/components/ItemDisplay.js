import React from 'react'

const ItemDisplay = ({ item }) => {

  //FLAG - make sure someone processes the fields so it says imageURL and moreInfoURL!
  return (
    <div className="item-display-container"> 
      <div>
        <img
          className="item-image"
          src={item.imageURL}
          alt={"item"}
        />
      </div>

      <div className="item-info">
        {item.name} <br/>
        {item.description} <br/>
        ${item.price} <br/>
        <a href={item.moreInfoURL} target="_blank" rel="noopener noreferrer"> More Info </a>
      </div>
    </div>
  )
}

export default ItemDisplay