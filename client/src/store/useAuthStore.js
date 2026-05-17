import { create } from "zustand";
import api from "../api/api";

const useAuthStore = create((set) => ({
  user: null,
  isInitialising: true,
  setUser: (u) => set({ user: u }),
  fetchUser: async () => {
    try {
      set({ isInitialising: true });
      const token = localStorage.getItem("token");
      if (!token) {
        set({ isInitialising: false });
        return;
      }
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ user: data.data, isInitialising: false });
    } catch (err) {
      localStorage.removeItem("token");
      set({ user: null, isInitialising: false });
      console.error(`Error: ${err.response.data.message}`);
    }
  },
}));

export default useAuthStore;
