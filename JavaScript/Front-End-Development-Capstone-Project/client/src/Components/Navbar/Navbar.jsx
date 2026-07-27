import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("auth-token");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 1000 1000"
            style={{ fill: "#3685fb" }}
          >
            <title>Doctor With Stethoscope</title>

            <g>
              <path d="M499.8,10c91.7,0,166,74.3,166,166s-74.3,166-166,166-166-74.3-166-166S408.1,10,499.8,10z" />
              <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
              <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44,77.2-88.8V584c90.5-15.2,160.1-94,160.8-188.9H693.2z" />
            </g>
          </svg>
        </Link>

        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <ul className={`nav__links ${isOpen ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>

        <li className="link">
          <Link to="/services">Appointments</Link>
        </li>

        <li className="link">
          <Link to="/health-blog">Health Blog</Link>
        </li>

        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>

        {!token ? (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>

            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/profile">Profile</Link>
            </li>

            <li className="link">
              <Link to="/reports">Reports</Link>
            </li>

            <li className="link">
              <button className="btn1 nav-logout" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
