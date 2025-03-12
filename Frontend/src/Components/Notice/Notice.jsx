import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/notices") // Update API route if necessary
      .then((res) => res.json())
      .then((data) => setNotices(data))
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
        {notices.map((notice, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{notice.description}</p>
            <p className="text-gray-500 text-xs mt-2">{new Date(notice.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
