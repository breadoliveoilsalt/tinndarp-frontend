import React from 'react'
import AccountStatusHeader from '../features/userAccount/AccountStatusHeader'
import HeaderLogoLink from './HeaderLogoLink'
import NavBar from './NavBar'
import Divider from './Divider'

const Header = () => {
  return (
    <div className="header">
      <AccountStatusHeader />
      <HeaderLogoLink /> 
      <Divider className="divider"/>
      <NavBar />
      <Divider className="divider"/>
    </div>
  )
}

export default Header;
