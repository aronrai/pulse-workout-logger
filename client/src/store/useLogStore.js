import { create } from "zustand";
import api from "../api/api";

const useLogStore = create((set, get) => ({
  logs: null,
  currentLogs: null,
  totalVolume: null,
  currentVolume: null,
  createLog: async (newLog) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/logs", newLog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      const volume = data.data.volume;
      set((state) => ({ currentVolume: state.currentVolume + volume }));
      set((state) => ({ totalVolume: state.totalVolume + volume }));
      const fetchCurrentLogs = get().fetchCurrentLogs;
      fetchCurrentLogs();
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
    }
  },
  fetchLogs: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await api.get("/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ logs: data.data });
    } catch (err) {
      console.log(`Error: ${err.response.data.message}`);
    }
  },
  fetchCurrentLogs: async (user) => {
    try {
      const token = localStorage.getItem("token");
      if (!token && !user) return;
      const response = await api.get("/logs/current-logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ currentLogs: data.data });
    } catch (err) {
      console.log(`Error: ${err.response.data.message}`);
    }
  },
  fetchTotalVolume: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await api.get("/logs/total-volume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ totalVolume: data.totalVolume });
    } catch (err) {
      console.log(`Error: ${err.response.data.message}`);
    }
  },
  fetchCurrentVolume: async (user) => {
    try {
      const token = localStorage.getItem("token");
      if (!token && !user) return;
      const response = await api.get("/logs/current-volume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      set({ currentVolume: data.currentVolume });
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
    }
  },
  deleteLog: async (id, volume) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await api.delete(`/logs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchLogs = get().fetchLogs;
      fetchLogs();
      const currentLogs = get().currentLogs;
      const newCurrentLogs = currentLogs.filter((log) => log._id !== id);
      set({ currentLogs: newCurrentLogs });
      set((state) => ({ currentVolume: state.currentVolume - volume }));
      set((state) => ({ totalVolume: state.totalVolume - volume }));
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
    }
  },
  fetchData: async (user) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user) return;
      const apiConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const [logResponse, volumeResponse, totalVolumeResponse] =
        await Promise.all([
          api.get("/logs/current-logs", apiConfig),
          api.get("/logs/current-volume", apiConfig),
          api.get("/logs/total-volume", apiConfig),
        ]);
      const logData = logResponse.data;
      const volumeData = volumeResponse.data;
      const totalVolumeData = totalVolumeResponse.data;
      set({
        currentLogs: logData.data,
        totalVolume: totalVolumeData.totalVolume,
        currentVolume: volumeData.currentVolume,
      });
    } catch (err) {
      console.log(`Error: ${err.response.data.message}`);
    }
  },
}));

export default useLogStore;
