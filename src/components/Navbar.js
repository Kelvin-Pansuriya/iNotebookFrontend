import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation()
  const myNavigate = useNavigate()

  const logout = (event)=>{
    event.preventDefault()
    localStorage.clear("JwtToken")
    myNavigate("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active":""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("JwtToken") ? <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-primary mx-1" role="button" onClick={logout}>Log Out</button>
          </form>:
          <form className="form-inline my-2 my-lg-0">
            <Link className="btn btn-primary mx-1" to="/singup" role="button">Sing Up</Link>
            <Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link>
          </form>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
