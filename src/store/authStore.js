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

  //login logic goes here just like the other signup logic not much of a difference
  logIn: async (email, password) => {
    set({ isLoading: true, error: null });

    //performing the fetching from our server

    try {
      const url = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // this part should always make sure that it exists to make sure that the data is recceived in  form of json
      console.log("data : ", data);

      if (!response.ok) {
        throw new Error(data.message);
      }
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      //returning the data that we have received from the response
      return data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
      });
      throw error;
    }
  },

  //LOgic for protecting ceratin routes using the middlware that we had created in our server

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${url}/api/auth/check-auth`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json", // note no body is passed because its a get request
        },
      });

      if (!response.ok) {
        throw new Error("There was a problem with the response !");
        console.log(data.message);
      }

      const data = await response.json();
      //pointblank if the user is not logged in then there
      console.log(data);

      set({
        isCheckingAuth: false,
        error: data.message,
      });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: true, user: null });
      console.log(error);
    }
  },
}));
