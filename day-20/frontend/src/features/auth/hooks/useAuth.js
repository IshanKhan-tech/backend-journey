import { useContext } from "react";
import { register, login, getMe, logout } from "../services/auth.api";
import {AuthContext} from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleGetMe = async () => {
    setLoading(false);
    const data = await getMe();
    setUser(data.user);
    setLoading(true);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
