import React from 'react'

const Navbar = () => {
  return (
    //   Navbar
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><i className="fas fa-code"></i> DevConnector</a>
      </h1>
      <ul>
        {/* Navigation Links */}
        <li><a href="profiles.html">Developers</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
