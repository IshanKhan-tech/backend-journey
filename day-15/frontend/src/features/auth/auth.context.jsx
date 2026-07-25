import { createContext, useState } from "react";

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContex.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContex.Provider>
  );
};
