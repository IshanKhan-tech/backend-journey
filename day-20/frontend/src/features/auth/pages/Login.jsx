import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({email, password})
    navigate('/')
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* ================= LEFT ================= */}
        <div className="hidden md:block">
          {/* Brand */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              mood<span className="text-violet-400">ify</span>
            </h1>

            <p className="text-zinc-500 text-sm mt-2">
              Understand your mood. Express yourself.
            </p>
          </div>

          {/* Main Heading */}
          <div>
            <p className="text-violet-400 text-sm font-medium mb-4">
              YOUR SPACE, YOUR MOOD
            </p>

            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.02]">
              Your mood
              <br />
              <span className="text-zinc-600">tells a story.</span>
            </h2>

            <p className="text-zinc-400 mt-7 max-w-lg text-[15px] leading-7">
              A simple space to understand how you feel, track your emotions,
              and discover more about yourself.
            </p>
          </div>

          {/* Small Features */}
          <div className="flex flex-wrap gap-3 mt-10">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="text-violet-400">✦</span>
              <span className="text-sm text-zinc-400">Track emotions</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="text-violet-400">◌</span>
              <span className="text-sm text-zinc-400">Understand yourself</span>
            </div>
          </div>
        </div>

        {/* ================= LOGIN ================= */}
        <div className="w-full max-w-md mx-auto">
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
            {/* Subtle Glow */}
            <div className="absolute -inset-4 bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative bg-[#111113] border border-zinc-800/80 rounded-3xl p-7 sm:p-9 shadow-2xl">
              {/* Card Heading */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Sign in to continue to Moodify.
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}

                <FormGroup
                  label={"Email"}
                  placeholder={"Enter your Email"}
                  type={"email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                {/* Password */}
                <FormGroup
                  label={"Password"}
                  placeholder={"Enter your Password"}
                  type={"password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                {/* Submit */}
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
                  Sign in
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <p className="text-center text-sm text-zinc-500">
                  Don't have an account?{" "}
                  
                    <Link 
                    className="text-white font-medium hover:text-violet-400 transition"
                     to={"/register"}>Create account</Link>
                  
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-600 mt-6">
            © 2026 Moodify
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
