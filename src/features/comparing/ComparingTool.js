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
          <Divider className="divider" />
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
      <div className="large-text">Results of Comparison to {comparedTo}</div>
      {commonItemsList}
    </div>
  )
}

export default ComparingTool