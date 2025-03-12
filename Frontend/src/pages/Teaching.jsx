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
    <div className="p-6 sm:p-12">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Meet Our <span className="text-blue-500">Teaching Staff</span>
      </motion.h1>

      <motion.div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {facultyData.map((faculty, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-transform duration-300"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center py-6 bg-gray-100">
              <img
                src={faculty.photo || "/Photos/default-avatar.png"}
                alt={faculty.fullName}
                className="w-24 h-24 object-cover rounded-full border-4 border-gray-300"
                loading="lazy"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">{faculty.name}</h2> 
            </div>
            <div className="p-6 text-center space-y-2">
              <p className="text-gray-600 text-sm">
                <strong>Designation:</strong> {faculty.designation}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Experience:</strong> {faculty.experience} years
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Qualification:</strong> {faculty.qualification}
              </p>
              <a
                href={`mailto:${faculty.email}`}
                className="inline-block mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                {faculty.email}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
