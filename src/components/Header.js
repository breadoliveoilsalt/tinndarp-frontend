import React from "react"
import Logo from "./Logo.js"
import Divider from "./Divider.js"

function Header() {
  return (
    <div>
      <Logo className="logo-header" />
      <Divider className="divider"/>
    </div>
  )
}

export default Header;
