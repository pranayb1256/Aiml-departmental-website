import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Announce() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("/api/admin/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📢 Latest Announcements
      </motion.h2>

      {/* Marquee for Latest Announcements */}
      <div className="overflow-hidden bg-blue-600 text-white py-2 rounded-md shadow-md">
        <motion.div
          className="flex space-x-8 whitespace-nowrap animate-marquee"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {announcements.slice(0, 5).map((announcement, index) => (
            <span key={index} className="text-sm font-medium mx-6">
              🔔 {announcement.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Announcements Grid */}
      <motion.div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {announcements.map((announcement, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">{announcement.text}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
