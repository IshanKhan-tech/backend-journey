 
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    isSeller: false,
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSeller = () => {
    setFormData((prev) => ({
      ...prev,
      isSeller: !prev.isSeller,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    isSeller: false,
    terms: false,
  })

    await handleRegister({
      email: formData.email,
      contact: formData.contactNumber,
      fullname: formData.fullName,
      password: formData.password,
      isSeller: formData.isSeller,
    });

    navigate("/")
  };

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen w-full bg-[#F9F6F1]">
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
          {/* LEFT PANEL */}
          <section className="relative h-[210px] w-full shrink-0 overflow-hidden bg-[#111] sm:h-[240px] md:h-[280px] lg:sticky lg:top-0 lg:h-screen lg:w-[43%]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Brand + Content */}
            <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
              <Link
                to="/"
                className="w-fit font-['Playfair_Display',serif] text-2xl tracking-[0.12em] text-white transition-opacity hover:opacity-70 sm:text-[26px] lg:text-3xl"
              >
                DRAPE
              </Link>

              <div className="hidden lg:block">
                <p className="mb-3 font-['Hanken_Grotesk',sans-serif] text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
                  Fashion Marketplace
                </p>

                <h1 className="max-w-[430px] font-['Playfair_Display',serif] text-[clamp(42px,5vw,68px)] font-normal leading-[0.98] tracking-[-0.03em] text-white">
                  Find pieces
                  <br />
                  <span className="italic text-[#D6B77A]">
                    worth keeping.
                  </span>
                </h1>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="w-full lg:min-h-screen lg:w-[57%]">
            <div className="mx-auto flex w-full max-w-[540px] flex-col px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:min-h-screen lg:justify-center lg:px-14 xl:px-16">
              {/* Header */}
              <div className="mb-8 sm:mb-9">
                <p className="mb-2 font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B3935A]">
                  Get Started
                </p>

                <h2 className="font-['Playfair_Display',serif] text-[36px] font-normal leading-[1.05] tracking-[-0.025em] text-[#171717] sm:text-[42px] md:text-[46px]">
                  Create Account
                </h2>

                <p className="mt-3 max-w-[400px] font-['Hanken_Grotesk',sans-serif] text-[13px] leading-5 font-light text-[#77736D]">
                  Create your DRAPE account to get started.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 sm:gap-[22px]"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A4742]"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    className="w-full border-b border-[#D8D2C8] bg-transparent px-0 py-2.5 text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A4742]"
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
                    className="w-full border-b border-[#D8D2C8] bg-transparent px-0 py-2.5 text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="mb-2 block font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A4742]"
                  >
                    Contact Number
                  </label>

                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                    className="w-full border-b border-[#D8D2C8] bg-transparent px-0 py-2.5 text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block font-['Hanken_Grotesk',sans-serif] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A4742]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      className="w-full border-b border-[#D8D2C8] bg-transparent px-0 py-2.5 pr-12 text-sm font-light text-[#171717] outline-none transition-colors placeholder:text-[#AAA49B] focus:border-[#B3935A]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 font-['Hanken_Grotesk',sans-serif] text-[10px] font-medium uppercase tracking-[0.08em] text-[#77736D] transition-colors hover:text-[#171717]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Seller Account */}
                <div className="flex items-center justify-between rounded-lg border border-[#DED8CE] bg-white/40 px-4 py-3.5">
                  <div className="min-w-0 pr-4">
                    <p className="font-['Hanken_Grotesk',sans-serif] text-sm font-medium text-[#171717]">
                      Seller account
                    </p>

                    <p className="mt-0.5 font-['Hanken_Grotesk',sans-serif] text-[11px] leading-4 font-light text-[#77736D]">
                      I want to sell products
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.isSeller}
                    onClick={toggleSeller}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                      formData.isSeller
                        ? "bg-[#B3935A]"
                        : "bg-[#D8D3CA]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        formData.isSeller
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-[#171717]"
                  />

                  <span className="font-['Hanken_Grotesk',sans-serif] text-[11px] leading-[17px] text-[#77736D]">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-[#4A4742] underline underline-offset-2"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-[#4A4742] underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#171717] py-3.5 font-['Hanken_Grotesk',sans-serif] text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#B3935A] active:scale-[0.99]"
                >
                  Create Account
                </button>
              </form>

              {/* Login */}
              <p className="mt-6 text-center font-['Hanken_Grotesk',sans-serif] text-xs text-[#77736D]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#171717] underline underline-offset-4 transition-colors hover:text-[#B3935A]"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Register;

