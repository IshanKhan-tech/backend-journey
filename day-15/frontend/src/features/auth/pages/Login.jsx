import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);

    navigate("/");

    setUsername("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="container">
        <div className="left">
          <h1>Instagram</h1>
          <p>Sign in to continue sharing your moments.</p>
        </div>

        <div className="right">
          <h2>Login</h2>

          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />

              <button type="submit">Log In</button>
            </form>

            <p>
              Don't have an account?
              <Link className="toggleAuthForm" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;