import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingout: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn:false });
      toast.success("Login Successfull!");
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      set({ user: null, isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ isLoggingout: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingout: false });
      toast.success("Logout Successfull!");
    } catch (error) {
      set({ isLoggingout: false});
      toast.error(error.response.data.message || "Logout Failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occured");
    }
  },
}));
