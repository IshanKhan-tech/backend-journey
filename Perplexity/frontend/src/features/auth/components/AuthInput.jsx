import React from 'react'

const AuthInput = ({label, placeholder, type, value, onChange}) => {
  return (
    <div>
      <div>
              <label className="block text-sm font-medium text-[#292929] mb-2">
                {label}
              </label>

              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full h-12 px-4 rounded-xl border border-[#dedbd4] bg-[#faf9f6] text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 placeholder:text-gray-400"
              />
            </div>
    </div>
  )
}

export default AuthInput
