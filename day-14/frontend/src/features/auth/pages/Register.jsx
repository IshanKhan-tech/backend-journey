import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const {handleRegister,loading} = useAuth()
  if(loading){
    return <h1>loading...</h1>
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(username,email,password).then(res=>{
      console.log(res);
    })

    
    setUsername("");
    setemail("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="container">
        <h1>Register</h1>
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
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="text"
              placeholder="Enter Email"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="Enter Password"
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="toggleAuthForm" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
