import React from 'react'
import Logo from './Logo'
import Divider from './Divider'

function Header() {
  return (
    <div>
      <Logo className="logo-header" />
      <Divider className="divider"/>
    </div>
  )
}

export default Header;
