import React from 'react'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import Divider from '../../components/Divider'
import CompareForm from './CompareForm'
import ItemDisplay from '../../components/ItemDisplay'

const ComparingDisplay = ({ errors, commonItems, comparedTo, handleComparison }) => {

  const errorsDisplay = errors ? < ErrorsDisplay errors = { errors } /> : null

  const generateCommonItemsDisplay = () => {
    return (
      <div>
        <div className="large-text">Results of Comparison to {comparedTo}</div>
        {generateCommonItemsList()}
      </div> 
    )
  }

  const generateCommonItemsList = () => {
    return commonItems.map( (commonItemData) => {
      return ( 
        <div key={commonItemData.id}> 
          <ItemDisplay item={commonItemData} /> 
          <Divider className="divider" />
        </div>
      )
    })
  }
  const commonItemsDisplay = commonItems ? generateCommonItemsDisplay() : null

  return (
    <div className="comparing-tool-container"> 
      {errorsDisplay}
      <CompareForm action={handleComparison} /> 
      <Divider className="divider" />
      {commonItemsDisplay}
    </div>
  )
}

export default ComparingDisplay