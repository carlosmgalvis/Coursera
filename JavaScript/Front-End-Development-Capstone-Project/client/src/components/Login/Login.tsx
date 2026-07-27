import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className="container">
            <div className="login-grid">
                <div className="login-header">
                    <h1>Login</h1>
                    <p className="login-text1">Not a member? <a href="../Sign_Up/Sign_Up.html">Sign Up</a></p>
                </div>

                <div className="login-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email"
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control"
                                placeholder="Enter your password" required />
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <button type="reset" className="btn btn-danger">Reset</button>
                        </div>

                        <div className="forgot-password">
                            <p><a href="#">Forgot Password?</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login