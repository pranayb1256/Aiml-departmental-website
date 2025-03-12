const ImageGallery = () => {
  const images = [
    { src: "/images/Student_Image/IMG_5030.jpg", size: "row-span-2 col-span-1" },
    { src: "/images/Student_Image/IMG_5031.jpg", size: "row-span-1 col-span-1" },
    { src: "/images/Student_Image/IMG_5032.jpg", size: "row-span-1 col-span-2" },
    { src: "/images/Student_Image/IMG_5046.jpg", size: "row-span-2 col-span-1" },
    { src: "/images/Student_Image/IMG_5067.jpg", size: "row-span-1 col-span-1" },
    { src: "/images/Student_Image/IMG_5860.jpg", size: "row-span-1 col-span-2" },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student <span className="text-blue-500">Gallery</span>
        </h2>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] md:auto-rows-[180px] gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-lg shadow-md ${image.size}`}
            >
              <img
                src={image.src}
                alt={`Student Event ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
