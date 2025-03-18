import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import axios from "axios";

const PlacedStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("/api/placed-student")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  return (
    <section className="p-6 bg-white text-center">
      <motion.h2 
        className="text-2xl font-bold text-blue-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 Congratulations to Our Placed Students! 🎉
      </motion.h2>

      <Marquee speed={50} gradient={true} gradientColor={[255, 255, 255]}>
        {students.map((student, index) => (
          <motion.div
            key={index}
            className="bg-blue-100 p-4 rounded-lg shadow-md mx-4 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={student.image}
              alt={student.name}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-gray-600">{student.company}</p>
          </motion.div>
        ))}
      </Marquee>
    </section>
  );
};

export default PlacedStudents;
