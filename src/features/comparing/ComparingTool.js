import React from 'react'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import Divider from '../../components/Divider'
import CompareForm from './CompareForm'
import ItemDisplay from '../../components/ItemDisplay'

const ComparingTool = ({ errors, commonItems, comparedTo, handleComparison }) => {

  const errorsDisplay = errors ? < ErrorsDisplay errors = { errors } /> : null

  const generateCommonItemsList = () => {
    return commonItems.map( (commonItemData) => {
      return ( 
        <div> 
          <ItemDisplay item={commonItemData} /> 
          <Divider />
        </div>
      )
    })
  }
  const commonItemsList = commonItems ? generateCommonItemsList() : null

  return (
    <div className="comparing-tool-container"> 
      {errorsDisplay}
      <CompareForm action={handleComparison} /> 
      <Divider className="divider" />
      Compared To: { comparedTo } < br / >
      Common Items: <br/> 
      {commonItemsList}
    </div>
  )
}

export default ComparingTool