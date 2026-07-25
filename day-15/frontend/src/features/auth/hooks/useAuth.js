import { useContext } from "react";
import { AuthContex } from "../auth.context";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContex);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    const response = await login(username, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleRegister = async (username,email,password)=>{
    setLoading(true)
    const res = await register(username,email,password)
    setUser(res.user)
    setLoading(false)
  }

  return{
    user, loading, handleLogin, handleRegister
  }
};
