import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const HeaderLogoLink = () => {
  return (
    <Link className="header-logo-link" to="/">
      <Logo className="logo-header" />
    </Link>
  )

}
export default HeaderLogoLink