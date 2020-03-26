import React from 'react'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import Divider from '../../components/Divider'
import CompareForm from './CompareForm'

const ComparingTool = ({ errors, commonItems, comparedTo, handleComparison }) => {

  const errorsDisplay = errors ? < ErrorsDisplay errors = { errors } /> : null

  const generateCommonItemsList = () => {
    return commonItems.map( (commonItemData) => {
      return ( <p key={commonItemData.id}> { JSON.stringify(commonItemData) } </p>)
    })
  }

  const commonItemsList = commonItems ? generateCommonItemsList() : null

  return (
    <div className="comparing-tool-container"> 
      {errorsDisplay}
      <CompareForm action={handleComparison} /> 
      <Divider className="divider" />
      You made it to the CompareContainer! < br / >
      Compared To: { comparedTo } < br / >
      Common Items: <br/> 
      {commonItemsList}
    </div>
  )
}

export default ComparingTool