import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handeLogin, loading } = useAuth();

  if(loading){
    return <h1>loading...</h1>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password);

    handeLogin(username, password).then( res => {
      console.log(res);
    });

    setUsername("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="container">
        <h1>Login</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Enter Username"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="Enter Password"
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link className="toggleAuthForm" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
