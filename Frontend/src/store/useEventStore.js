import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],

  // Fetch events from the backend
  fetchEvents: async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/events`);
      const data = await res.json();
      set({ events: data });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },

  // Add a new event
  addEvent: async (event) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const res = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      const newEvent = await res.json();
      set((state) => ({ events: [...state.events, newEvent] }));
    } catch (error) {
      console.error("Error adding event:", error);
    }
  },

  // Delete an event
  deleteEvent: async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      await fetch(`${apiUrl}/events/${id}`, { method: "DELETE" });
      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  },
}));

export default useEventStore;
