import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function NonTeachingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    fetch("/api/nonfaculty") // Ensure correct backend URL
      .then((res) => res.json())
      .then((data) => setFacultyData(data))
      .catch((err) => console.error("Error fetching non-faculty:", err));
  }, []);

  return (
    <div className="p-6 sm:p-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-gray-900 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Meet Our <span className="text-blue-600">Non-Teaching Staff</span>
      </motion.h1>

      {/* Staff Grid */}
      <motion.div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {facultyData.map((faculty, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all hover:shadow-2xl border border-gray-200 hover:border-blue-400 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Staff Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
              <img
                src={faculty.photo || "/Photos/default-avatar.png"}
                alt={faculty.fullname}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Staff Details */}
            <h3 className="text-xl font-semibold mt-4 text-gray-900">{faculty.fullname}</h3>
            <p className="text-gray-500 text-sm">{faculty.designation}</p>
            <p className="text-gray-400 text-sm mt-1">Experience: {faculty.experience} years</p>
            <p className="text-gray-400 text-sm">Qualification: {faculty.qualification}</p>
          </motion.div>
        ))}


        
      </motion.div>

      {/* No Staff Found */}
      {facultyData.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">No non-teaching staff data available.</p>
      )}
    </div>
  );
}
