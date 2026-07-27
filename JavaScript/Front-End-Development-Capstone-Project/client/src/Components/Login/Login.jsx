import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      const json = contentType.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        if (json?.errors) {
          json.errors.forEach((error) => alert(error.msg));
        } else {
          alert(json?.error || "Login failed.");
        }
        return;
      }

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);

        navigate("/");
        window.location.reload();
      } else {
        if (json?.errors) {
          json.errors.forEach((error) => alert(error.msg));
        } else {
          alert(json?.error || "Login failed.");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server. Please make sure the backend is running on port 8181.");
    }
  };

  return (
    <div className="container">
      <div className="login-grid">

        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member?
          <span>
            <Link to="/signup" style={{ color: "#2190FF" }}>
              {" "}
              Sign Up Here
            </Link>
          </span>
        </div>

        <br />

        <div className="login-form">
          <form onSubmit={login}>

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

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>

              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
              >
                Reset
              </button>
            </div>

            <div className="login-text">
              <a href="#">Forgot Password?</a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
