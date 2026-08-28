import { useContext } from "react";
import { register, login, getMe, logout } from "../services/auth.api";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
  setLoading(true);

  try {
    const data = await register({
      username,
      email,
      password,
    });

    setUser(data.user);
  } catch (error) {
    console.log(error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const handleLogin = async ({ email, password }) => {
  setLoading(true);

  try {
    const data = await login({ email, password });
    setUser(data.user);
  } catch (error) {
    console.log(error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const handleGetMe = async () => {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
  setLoading(true);

  try {
    await logout();
    setUser(null);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
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
