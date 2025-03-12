import { create } from "zustand";
import axios from "axios";

const useGalleryStore = create((set) => ({
  images: [],
  loading: false,
  error: null,
  fetchImages: async () => {
    set({ loading: true, error: null });
    const abortController = new AbortController(); // Abort controller for cleanup

    try {
      const response = await axios.get("/api/homepage/get-images", {
        signal: abortController.signal,
      });

      const studentGalleryImages = response.data?.images?.[0]?.studentGallery || [];
      set({ images: studentGalleryImages, loading: false });

      if (studentGalleryImages.length === 0) {
        set({ error: "No images available." });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        set({ error: "Failed to load images", loading: false });
      }
    }
  },
}));

export default useGalleryStore;
