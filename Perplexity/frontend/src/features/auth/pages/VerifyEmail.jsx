import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const VerifyEmail = () => {
  const { handleVerifyEmail } = useAuth();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);

  const checkVerification = async () => {
    setChecking(true);

    const result = await handleVerifyEmail();

    setChecking(false);

    if (result) {
      navigate("/");
    }
  };

  useEffect(() => {
  checkVerification();

  const interval = setInterval(checkVerification, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1f1f1f]">
            Perplexity
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Verify your email to continue
          </p>
        </div>

        <div className="bg-white border border-[#e9e5dd] rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
            <span className="text-2xl">✉</span>
          </div>

          <h2 className="text-xl font-semibold text-[#1f1f1f]">
            Check your inbox
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            We sent a verification link to your email address. Please verify
            your email and keep this page open.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-orange-500">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Waiting for verification...
          </div>

          <button
            onClick={checkVerification}
            disabled={checking}
            className="w-full h-11 mt-7 rounded-xl border border-[#e9e5dd] text-sm font-medium text-[#1f1f1f] transition hover:bg-[#f8f6f1] disabled:opacity-50"
          >
            {checking ? "Checking..." : "I've verified my email"}
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          You can verify your email from another device too.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
