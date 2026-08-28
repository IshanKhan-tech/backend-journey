import React, { useEffect } from "react";
import favicon from "../../../assets/favicon.png";
import {useAuth} from "../../auth/hooks/useAuth"

const Navbar = () => {
  const {handleLogout,user} = useAuth()

  

  return (
    <nav className="w-full border-b border-zinc-800/80 bg-[#09090b]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <img src={favicon} alt="M" className="h-8 w-8 object-contain" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            mood<span className="text-violet-400">ify</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Username */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">
              {user?.username[0] || "U"}
            </div>

            <span className="max-w-[100px] truncate text-sm font-medium text-zinc-300 sm:max-w-[150px]">
              {user?.username || "Username"}
            </span>
          </div>

          {/* Logout */}
          <button
          onClick={handleLogout}
            className="
              rounded-xl
              border border-zinc-800
              bg-[#111113]
              px-3.5 py-2
              text-xs font-semibold text-zinc-300
              transition-all duration-200
              hover:border-violet-400/30
              hover:bg-violet-500/10
              hover:text-violet-400
              active:scale-[0.97]
              sm:px-4
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
