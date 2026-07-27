import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showerr, setShowerr] = useState("");

  const register = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!role) {
      setShowerr("Please select a role.");
      return;
    }

    if (!name.trim()) {
      setShowerr("Name is required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setShowerr("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setShowerr("Enter a valid email address.");
      return;
    }

    if (!password) {
      setShowerr("Password is required.");
      return;
    }

    setShowerr("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          name,
          email,
          phone,
          password,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        const validationErrors = json?.errors || json?.error;
        if (Array.isArray(validationErrors) && validationErrors.length) {
          setShowerr(validationErrors[0].msg);
        } else {
          setShowerr(json?.error || "Registration failed.");
        }
        return;
      }

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        navigate("/");
        window.location.reload();
      } else {
        const validationErrors = json?.errors || json?.error;
        if (Array.isArray(validationErrors) && validationErrors.length) {
          setShowerr(validationErrors[0].msg);
        } else {
          setShowerr(json?.error || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setShowerr("Unable to connect to server. Please make sure the backend is running on port 8181.");
    }
  };

  const resetForm = () => {
    setRole("");
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setShowerr("");
  };

  return (
    <div className="container">
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1">
          Already a member?
          <span>
            <Link to="/login"> Login</Link>
          </span>
        </div>

        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Role</label>

              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option>Doctor</option>
                <option>Patient</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            {showerr && (
              <div
                style={{
                  color: "red",
                  marginBottom: "15px",
                  fontWeight: "500",
                }}
              >
                {showerr}
              </div>
            )}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
