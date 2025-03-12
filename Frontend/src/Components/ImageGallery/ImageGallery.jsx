import { useEffect } from "react";
import Masonry from "react-masonry-css";
import useGalleryStore from "../../store/useGalleryStore"; // Zustand Store

const ImageGallery = () => {
  const { images, loading, error, fetchImages } = useGalleryStore();

  useEffect(() => {
    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    480: 1,
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Student <span className="text-blue-500">Gallery</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading images...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-md mb-4 transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={image}
                  alt={`Student Event ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback.jpg")} // Fallback Image
                />
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;
