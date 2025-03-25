import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Achievements = () => {
  // Define image paths (stored in "public/images")
  const eventImages = ["/images/img1.jpg", "/images/img2.jpg", "/images/img3.jpg"];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Student <span className="text-blue-500">Achievements</span>
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={20}
        loop
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
        {eventImages.map((src, index) => (
          <SwiperSlide key={index} className="w-80 md:w-96 h-auto">
            <div className="h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-xl">
              <img
                src={src}
                alt={`Achievement ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => (e.target.src = "/images/fallback.jpg")} // Fallback if image is missing
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Achievements;
