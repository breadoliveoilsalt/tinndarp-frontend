import React from 'react'
import Logo from './Logo'
import AccountStatusHeader from '../features/userAccount/AccountStatusHeader'
import Divider from './Divider'

//TEST ACCOUNTSTAUSHEADERHERE
const Header = () => {
  return (
    <div className="header">
      <AccountStatusHeader />
      <Logo className="logo-header" />
      <Divider className="divider"/>
    </div>
  )
}

export default Header;
