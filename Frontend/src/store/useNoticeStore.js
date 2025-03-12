import { create } from "zustand";

const useNoticeStore = create((set) => ({
  notices: [],

  // Fetch notices from the backend
  fetchNotices: async () => {
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();
      set({ notices: data });
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  },

  // Add a new notice
  addNotice: async (notice) => {
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notice),
      });
      const newNotice = await res.json();
      set((state) => ({ notices: [...state.notices, newNotice] }));
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  },

  // Delete a notice
  deleteNotice: async (id) => {
    try {
      await fetch(`/api/notices/${id}`, { method: "DELETE" });
      set((state) => ({ notices: state.notices.filter((notice) => notice._id !== id) }));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  },
}));

export default useNoticeStore;
