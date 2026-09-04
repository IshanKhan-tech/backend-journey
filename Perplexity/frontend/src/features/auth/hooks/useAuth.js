import { useDispatch } from "react-redux";
import { register, login, verifyEmail, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../redux/authSlice";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  reload,
} from "firebase/auth";

import { auth } from "../../../config/firebase";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (username, email, password) => {
    try {
      dispatch(setLoading(true));

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;

      await sendEmailVerification(firebaseUser);

      const idToken = await firebaseUser.getIdToken();

      await register(username, email, password, idToken);
      return true;
    } catch (error) {
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerifyEmail = async () => {
    try {
      dispatch(setLoading(true));

      if (!auth.currentUser) {
        dispatch(setError("No user found."));
        return false;
      }

      await reload(auth.currentUser);
      if (!auth.currentUser.emailVerified) {
        dispatch(setError("Email is not verified yet."));
        return false;
      }

      const idToken = await auth.currentUser.getIdToken(true);

      const data = await verifyEmail(idToken);
      dispatch(setUser(data.user));
      return true;
    } catch (error) {
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (email, password) => {
    try {
      dispatch(setLoading(true));

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        dispatch(
          setError("Please verify your email address before logging in."),
        );
        dispatch(setLoading(false));
        return;
      }

      const idToken = await firebaseUser.getIdToken(true);

      const data = await login(idToken);

      dispatch(setUser(data.user));
      return true;
    } catch (error) {
      dispatch(setError(error.message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleVerifyEmail,
    handleLogin,
    handleGetMe,
  };
};
