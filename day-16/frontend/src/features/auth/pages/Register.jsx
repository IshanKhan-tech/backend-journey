import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password);

    navigate("/");

    setUsername("");
    setemail("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="container">
        <div className="left">
          <h1>Instagram</h1>
          <p>Create your account and connect with everyone.</p>
        </div>

        <div className="right">
          <h2>Create Account</h2>

          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />

              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
                placeholder="Email"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />

              <button type="submit">Register</button>
            </form>

            <p>
              Already have an account?
              <Link className="toggleAuthForm" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;