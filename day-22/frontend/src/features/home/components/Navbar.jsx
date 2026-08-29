import React from "react";
import favicon from "../../../assets/favicon.png";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const { handleLogout, user } = useAuth();

  const username = user?.username || "Username";
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-5 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src={favicon}
            alt="Moodify"
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          />

          <h1 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
            mood<span className="text-violet-400">ify</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2.5 sm:gap-4">

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">
              {firstLetter}
            </div>

            <span className="max-w-[90px] truncate text-xs font-medium text-zinc-300 sm:max-w-[150px] sm:text-sm">
              {username}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              rounded-lg
              border border-zinc-800
              bg-[#111113]
              px-3 py-1.5
              text-xs
              font-semibold
              text-zinc-300
              transition-all
              duration-200
              hover:border-violet-400/30
              hover:bg-violet-500/10
              hover:text-violet-400
              active:scale-95
              sm:rounded-xl
              sm:px-4
              sm:py-2
              sm:text-sm
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;