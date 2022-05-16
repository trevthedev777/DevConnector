import React from 'react';
// To Avoid <a>
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    //   Navbar
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
            <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        {/* Navigation Links */}
        <li>
            <Link to="profiles.html">Developers</Link>
        </li>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
