import React, { useState } from "react";
import AuthInput from "../components/authInput";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      // 1. Login user with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // 2. Check email verification
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email first.");
        navigate("/verify-email");
        return;
      }

      // 3. Get Firebase ID token
      const idToken = await userCredential.user.getIdToken(true);

      // 4. Send ID token to backend
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            idToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);

      // 5. Login successful
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* App Name */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1f1f1f]">
            Perplexity
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#e9e5dd] rounded-2xl p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <form className="space-y-5" onSubmit={submitHandler}>

            {/* Email */}
            <AuthInput
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            {/* Password */}
            <AuthInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-orange-500 text-white text-sm font-medium transition hover:bg-orange-600 active:scale-[0.98] shadow-sm"
            >
              Login
            </button>
          </form>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-orange-500 font-medium cursor-pointer hover:text-orange-600"
          >
            Create account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;

