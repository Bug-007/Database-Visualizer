
import React, {} from "react";
import { NavLink } from "react-router-dom";
const Header = () => {

  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{backgroundColor: "white"}}>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLink className="navbar-brand mt-2 mt-lg-0" to="/">
                  Dashboard
                </NavLink>
          </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
                  
              <li className="nav-item">
                <NavLink className="nav-link" to="/Signup">
                  Signup
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/form">
                  AddProduct
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/usermanager">
                  Users
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/datamanager">
                  Data
                </NavLink>
                </li>
              </ul>
            </div>
            </nav>
          </div>
  );
};

export default Header;