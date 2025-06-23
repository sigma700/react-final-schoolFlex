import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // State
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: false,

  // Actions
  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      // console.log(url);

      const response = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("data : ", data);
      // console.log(data.user);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      set({
        user: data.user, //this part needs to get checked
        isAuthenticated: true,
        isLoading: false,
      });

      return data;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
