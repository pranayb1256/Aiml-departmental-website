import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const eventImages = [
  "../../assets/images/hompageEvent/IMG_4091.jpg",
  "../../assets/images/hompageEvent/IMG_4097.jpg",
  "../../assets/images/hompageEvent/IMG_4274.jpg",
  "../../assets/images/hompageEvent/IMG_4298.jpg",
  "../../assets/images/hompageEvent/IMG_4321.jpg",
  "../../assets/images/hompageEvent/IMG_5010.jpg",
  "../../assets/images/hompageEvent/IMG_5012.jpg",
  "../../assets/images/hompageEvent/IMG_5014.jpg",
  "../../assets/images/hompageEvent/IMG_5037.jpg",
  "../../assets/images/hompageEvent/IMG_5047.jpg",
];

const ImageCarousel = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Our <span className="text-blue-500">Events</span>
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Ensure visible slides are balanced
        spaceBetween={20} // Add spacing between slides
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: false, // Prevent unnecessary shadowing
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
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
