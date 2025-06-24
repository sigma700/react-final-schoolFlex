export const useSchoolStore = create((set) => ({
  //states

  school: null,
  value: null,
  isLoading: false,
  error: null,
  //   isAuthenticated: false,

  //actions

  createSchool: async (name, contacts, location, category, system) => {
    set({ isLoading: true, error: null });

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = fetch(`${url}/api/schools/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify({ name, contacts, location, category, system }),
      });
      const data = await response.json;
      console.log("data", data);
      if (!response.ok) {
        console.log(data.message);
      }

      set({
        isLoading: false,
        school: data.school,
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
