import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

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

export default function TeachingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    fetch("/api/faculty") // Ensure correct backend URL
      .then((res) => res.json())
      .then((data) => setFacultyData(data))
      .catch((err) => console.error("Error fetching faculty:", err));
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
        Meet Our <span className="text-blue-600">Teaching Staff</span>
      </motion.h1>

      {/* Faculty Grid */}
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
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all hover:shadow-2xl border border-gray-100 hover:border-blue-400 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Faculty Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <img
                src={faculty.profileImage || "/Photos/avatar.png"}
                alt={faculty.fullName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Faculty Details */}
            <h3 className="text-xl font-semibold mt-4 text-gray-900">{faculty.name}</h3>
            <p className="text-gray-500 text-sm">{faculty.designation}</p>
            <p className="text-gray-400 text-sm mt-1">Experience: {faculty.experience} years</p>
            <p className="text-gray-400 text-sm">Qualification: {faculty.qualification}</p>

            {/* Social Links */}
            <div className="flex gap-6 mt-4">
              {faculty.linkedin && (
                <a
                  href={faculty.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-2xl hover:scale-110 transition"
                >
                  <FaLinkedin />
                </a>
              )}

              {/* Email Icon */}
              <a
                href={`mailto:${faculty.email}`}
                className="text-gray-600 text-2xl hover:text-blue-600 hover:scale-110 transition"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Faculty Found */}
      {facultyData.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">No faculty data available.</p>
      )}
    </div>
  );
}
