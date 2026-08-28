import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

FormGroup
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {handleRegister} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({username,email,password})
    navigate('/')
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* ================= REGISTER ================= */}
        <div className="w-full max-w-md mx-auto order-2 md:order-1">

          {/* Mobile Brand */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              mood<span className="text-violet-400">ify</span>
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Understand your mood. Express yourself.
            </p>
          </div>

          {/* Card */}
          <div className="relative">

            <div className="absolute -inset-4 bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative bg-[#111113] border border-zinc-800/80 rounded-3xl p-7 sm:p-9 shadow-2xl">

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Create your account
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Join Moodify and start your journey.
                </p>
              </div>

              {/* Form */}
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >

                <FormGroup
                  label="Username"
                  placeholder="Choose a username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <FormGroup
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormGroup
                  label="Password"
                  placeholder="Create a password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="
                    w-full h-12
                    mt-2
                    rounded-xl
                    bg-violet-500
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-violet-400
                    active:scale-[0.98]
                    transition-all duration-200
                    shadow-lg shadow-violet-500/10
                  "
                >
                  Create account
                </button>

              </form>

              {/* Login */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <p className="text-center text-sm text-zinc-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white font-medium hover:text-violet-400 transition"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-600 mt-6">
            © 2026 Moodify
          </p>

        </div>


        {/* ================= RIGHT BRAND ================= */}
        <div className="hidden md:block order-1 md:order-2">

          <div className="mb-10">

            <h1 className="text-4xl font-bold tracking-tight">
              mood<span className="text-violet-400">ify</span>
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Understand your mood. Express yourself.
            </p>

          </div>

          <div>

            <p className="text-violet-400 text-sm font-medium mb-4">
              WELCOME TO MOODIFY
            </p>

            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.02]">
              A better way
              <br />
              <span className="text-zinc-600">
                to know yourself.
              </span>
            </h2>

            <p className="text-zinc-400 mt-7 max-w-md text-[15px] leading-7">
              Track how you feel, reflect on your emotions,
              and discover what your mood is telling you.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;