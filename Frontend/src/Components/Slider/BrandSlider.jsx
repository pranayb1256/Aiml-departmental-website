import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function BrandSlider() {
    const [recruiters, setRecruiters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/homepage/get-images");

                console.log("API Response:", response.data); // Debugging

                // Extract recruiters array correctly
                const recruiterImages = response.data[0]?.recruiters || [];

                console.log("Extracted Recruiters:", recruiterImages); // Debugging

                setRecruiters(recruiterImages);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching recruiter images:", error);
                setIsLoading(false);
            }
        };

        fetchRecruiters();
    }, []);

    // Marquee animation settings
    const getMarqueeVariants = (isPaused) => ({
        animate: {
            x: ["0%", "-100%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 10,
                    ease: "linear",
                    repeatDelay: 0,
                },
            },
        },
    });

    return (
        <div className="max-w-full mx-auto p-6 text-center bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Top <span className="text-blue-500">Placements</span>
            </h2>

            {isLoading ? (
                <p className="text-gray-500">Loading images...</p>
            ) : (
                <div
                    className="overflow-hidden relative w-full py-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex space-x-10 whitespace-nowrap"
                        variants={getMarqueeVariants(isPaused)}
                        animate={isPaused ? "paused" : "animate"}
                    >
                        {recruiters.length > 0 ? (
                            [...recruiters, ...recruiters].map((src, index) => (
                                <img
                                    key={index}
                                    src={src}  // Cloudinary Image URL
                                    alt={`Recruiter ${index + 1}`}
                                    className="h-20 transition-transform transform hover:scale-110"
                                    onError={(e) => console.error("Image load error:", src)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No images available.</p>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
