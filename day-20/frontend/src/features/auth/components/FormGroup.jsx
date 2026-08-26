import React from "react";

const FormGroup = ({label, placeholder, type, value, onChange}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-zinc-300 mb-2"
      >
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        id={label}
        type={type}
        placeholder={placeholder}
        autoComplete="email"
        className="
                      w-full h-12 px-4
                      rounded-xl
                      bg-[#09090b]
                      border border-zinc-800
                      text-sm text-white
                      placeholder:text-zinc-600
                      outline-none
                      transition-all duration-200
                      focus:border-violet-400/70
                      focus:ring-4
                      focus:ring-violet-400/10
                      
                    "
                    
      />
    </div>
  );
};

export default FormGroup;
