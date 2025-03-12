import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/notices")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging
        setNotices(Array.isArray(data) ? data : data.notices || []);
      })
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📌 Official Notices
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">{notice.text}</h3>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notices available.</p>
        )}
      </motion.div>
    </div>
  );
}
