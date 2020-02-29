import React from 'react';
import logo from './images/logo.png'
import './App.css'

const Logo = (props) => {
  return (
    <div className={props.className}>
      <img className={props.className}
        src={logo}
        alt={"TINNDARP logo"}
      />
    </div>
  )
}

export default Logo
