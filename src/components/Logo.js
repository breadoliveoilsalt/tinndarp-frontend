import React from 'react';
import logo from './images/logo.png'
import './App.css'

function Logo(props) {
  return (
    <div className={props.className}>
      <img className={props.className} src={logo} />
    </div>
  )
}

export default Logo;
