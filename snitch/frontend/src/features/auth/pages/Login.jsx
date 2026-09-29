
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const {handleLogin} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    setFormData({
    email: "",
    password: "",
  })

    await handleLogin({
      email: formData.email,
      password: formData.password
    })
    navigate("/")
  };

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen w-full bg-[#F9F6F1] md:h-screen md:overflow-hidden">
        <div className="flex min-h-screen w-full flex-col md:h-screen md:flex-row">

          {/* LEFT — VISUAL PANEL */}
          <section className="relative h-[270px] w-full shrink-0 overflow-hidden bg-[#111] md:h-full md:w-[46%]">
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Brand */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
              <Link
                to="/"
                className="w-fit font-['Playfair_Display',serif] text-2xl font-medium tracking-[0.12em] text-white transition-opacity hover:opacity-70 md:text-3xl"
              >
                DRAPE
              </Link>

              {/* Desktop message */}
              <div className="hidden md:block">
                <p className="mb-4 font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  Welcome Back
                </p>

                <h1 className="max-w-[460px] font-['Playfair_Display',serif] text-[clamp(44px,5vw,72px)] font-normal leading-[0.94] tracking-[-0.035em] text-white">
                  Your style
                  <br />
                  <span className="italic text-[#D6B77A]">
                    awaits.
                  </span>
                </h1>

                <p className="mt-6 max-w-[330px] font-['Hanken_Grotesk',sans-serif] text-xs font-light leading-5 text-white/55">
                  Discover pieces worth keeping and connect with
                  a marketplace built around personal style.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT — LOGIN PANEL */}
          <section className="flex min-h-[calc(100vh-270px)] flex-1 overflow-y-auto bg-[#F9F6F1] md:h-full md:min-h-0 md:items-center">
            <div className="mx-auto flex w-full max-w-[520px] flex-col justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-16">

              {/* Header */}
              <div className="mb-9">
                <p className="mb-2.5 font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B3935A]">
                  Welcome Back
                </p>

                <h2 className="font-['Playfair_Display',serif] text-[clamp(38px,4vw,54px)] font-normal leading-none tracking-[-0.03em] text-[#171717]">
                  Sign in
                </h2>

                <p className="mt-3 max-w-[390px] font-['Hanken_Grotesk',sans-serif] text-[13px] font-light leading-5 text-[#77736D]">
                  Enter your details to continue to your DRAPE account.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A4742]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full border-0 border-b border-[#D8D2C8] bg-transparent px-0 py-3 font-['Hanken_Grotesk',sans-serif] text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.15em] text-[#4A4742]"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="font-['Hanken_Grotesk',sans-serif] text-[10px] font-medium text-[#B3935A] transition-colors hover:text-[#8F703F]"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full border-0 border-b border-[#D8D2C8] bg-transparent px-0 py-3 pr-14 font-['Hanken_Grotesk',sans-serif] text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#77736D] transition-colors hover:text-[#171717]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer accent-[#171717]"
                  />

                  <span className="font-['Hanken_Grotesk',sans-serif] text-[11px] text-[#77736D]">
                    Remember me
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-1 w-full bg-[#171717] py-4 font-['Hanken_Grotesk',sans-serif] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B3935A] active:scale-[0.99]"
                >
                  Sign In
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 text-center">
                <p className="font-['Hanken_Grotesk',sans-serif] text-xs text-[#77736D]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#171717] underline underline-offset-4 transition-colors hover:text-[#B3935A]"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Bottom detail */}
              <div className="mt-9 border-t border-[#E2DDD5] pt-5 text-center">
                <p className="font-['Hanken_Grotesk',sans-serif] text-[9px] uppercase tracking-[0.18em] text-[#A7A29A]">
                  © 2026 DRAPE — All Rights Reserved
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
