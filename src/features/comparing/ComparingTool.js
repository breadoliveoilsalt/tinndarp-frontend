import React from 'react'
import ErrorsDisplay from '../../components/ErrorsDisplay'

const ComparingTool = ({ errors, commonItems, comparedTo }) => {

  const errorsDisplay = errors ? < ErrorsDisplay errors = { errors } /> : null

  const generateCommonItemsList = () => {
    return commonItems.map(commonItemData => {
      return ( <p> { JSON.stringify(commonItemData) } </p>)
    })
  }

  const commonItemsList = commonItems ? generateCommonItemsList() : null

  return (
    <div className="comparing-tool-container"> 
      {errorsDisplay}
      You made it to the CompareContainer! < br / >
      Compared To: { comparedTo } < br / >
      Common Items: <br/> 
      {commonItemsList}
    </div>
  )
}

export default ComparingTool