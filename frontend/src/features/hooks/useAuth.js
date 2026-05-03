/**
 * hooks layer - Auth logic handler
 */

import { useContext } from "react";
import { AuthContext } from "../auth/auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { toast } from "react-toastify";
import { uploadAvatar } from "../services/user.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  // 🛡️ safety check
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  // ----------------------------
  // 🔹 REGISTER
  // ----------------------------
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);

      setUser(response.user);

      toast.success("Registration successful! Please verify your email 📧");

      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 LOGIN
  // ----------------------------
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);

      setUser(response.user);

      toast.success("Login successful 🎉");

      return true; // navigation allow
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "Please verify your email first") {
        toast.warning("⚠️ Please verify your email first");
      } else {
        toast.error(message || "Invalid credentials");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 GET CURRENT USER
  // ----------------------------
  const handleGetMe = async () => {
    // 🧠 avoid unnecessary API call
    if (user) return user;

    setLoading(true);
    try {
      const response = await getMe();

      const currentUser = response.user || response; // flexible API support

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      // token invalid / expired case
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 LOGOUT
  // ----------------------------
  const handleLogout = async () => {
    try {
      await logout(); // optional backend call

      setUser(null);

      toast.success("Logged out successfully 👋");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // ----------------------------
  // 🔹 UPLOAD AVATAR
  // ----------------------------
const handleAvatarUpload = async (file) => {
   toast.info("Uploading avatar... ⏳"); 
  try {
    const response = await uploadAvatar(file);

    console.log("UPLOAD RESPONSE:", response);

    if (response?.user) {
      setUser(response.user);
    }

    return response.user;
  } catch (error) {
    console.log("UPLOAD ERROR FRONTEND:", error);
    toast.error("Avatar upload failed");
    return null;
  }
};

  // ----------------------------
  // 🔹 RETURN
  // ----------------------------
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
    handleAvatarUpload,
  };
};