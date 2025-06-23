import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // State
  user: null,
  value: null,
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

  //action for verifyEmail upon form submission

  verifMail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${url}/api/auth/signup/verify`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ code }), //make sure it matches your server
        credentials: "include",
      });

      //a simple check for the response :
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      //else if there is no error in the response :

      console.log(data);

      set({
        isAuthenticated: true,
        isLoading: false,
        user: data.user,
      });
      return data;
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      console.log(error.message);
      throw error;
    }
  },
}));
