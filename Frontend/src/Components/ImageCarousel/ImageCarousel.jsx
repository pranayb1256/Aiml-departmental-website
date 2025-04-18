import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel = () => {
  const [eventImages, setEventImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // Prevent setting state on unmounted component

    const fetchEventImages = async () => {
      try {
        const response = await axios.get("/api/homepage/get-images");

        if (isMounted) {
          console.log("API Response:", response.data);

          // Extract event images properly
          const homepageEventImages = response.data.images?.[0]?.homepageEvent || [];

          if (!homepageEventImages.length) {
            setError("No event images available.");
          }

          setEventImages(homepageEventImages);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching event images:", error);
          setError("Failed to load event images.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEventImages();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  // Memoize images to prevent unnecessary re-renders
  const memoizedImages = useMemo(() => eventImages, [eventImages]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Our <span className="text-blue-500">Events</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading event images...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1} // Default for small screens
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 40,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
          className="w-full max-w-5xl"
        >
          {memoizedImages.map((src, index) => (
            <SwiperSlide key={index} className="w-80 md:w-96 h-auto">
              <div className="h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-xl">
                <img
                  src={src}
                  alt={`Event ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy" // Improves page speed
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageCarousel;
