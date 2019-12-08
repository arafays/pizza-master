import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header id="header">
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Menu
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
