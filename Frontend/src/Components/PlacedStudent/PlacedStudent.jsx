import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const PlacedStudents = () => {
  const [students, setStudents] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/placed-student`)
      .then((response) => response.json())
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <section className="relative p-10 bg-gradient-to-b from-white to-blue-50 text-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10 blur-3xl"></div>

      <motion.h2
        className="relative text-4xl font-bold text-gray-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 Congratulations to <span className="text-blue-600">Our Placed Students!</span> 🎉
      </motion.h2>

      {/* Student Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {students.length > 0 ? (
          students.map((student, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-28 h-28 rounded-full mb-4 shadow-md border-4 border-blue-500"
              />
              <h3 className="text-2xl font-semibold text-gray-800">{student.name}</h3>
              <p className="text-lg text-gray-600">{student.company}</p>
            </motion.div>
          ))
        ) : (
          <p className="relative text-gray-500 text-lg">No students placed yet.</p>
        )}
      </div>
    </section>
  );
};

export default PlacedStudents;
