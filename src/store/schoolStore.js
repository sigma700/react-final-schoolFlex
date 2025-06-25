import { create } from "zustand";

export const useSchoolStore = create((set) => ({
  //states

  school: null,
  value: null,
  isLoading: false,
  error: null,
  //   isAuthenticated: false,

  //actions

  createSchool: async (schoolData) => {
    set({ isLoading: true, error: null });

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${url}/api/schools/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify({
          ...schoolData,
        }),
      });
      const data = await response.json();

      console.log("data", data);
      if (!response.ok) {
        console.log("An error occured with making the response !");
      }

      set({
        isLoading: false,
        // school: data.schools,
      });

      return data;
    } catch (error) {
      set({
        error: error.message,
      });
      throw error;
    }
  },
}));
