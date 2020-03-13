import React from 'react'
import UnauthenticatedRoutes from './UnauthenticatedRoutes'
import AuthenticatedRoutes from './AuthenticatedRoutes'

const RoutesContainer = () => {

  return (
    <div>
      <AuthenticatedRoutes />
      <UnauthenticatedRoutes />
    </div>
  )
}

export default RoutesContainer
