import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client"; // Import Socket.io

export default function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const socket = io("https://aiml-departmental-website-n.onrender.com");
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/admin/notices`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging
        setNotices(Array.isArray(data) ? data : data.notices || []);
      })
      .catch((err) => console.error("Error fetching notices:", err));

    // Listen for new notices
    socket.on("new-notice", (newNotice) => {
      setNotices((prev) => [newNotice, ...prev]); // Add new notice at the top
    });

    // Listen for deleted notices
    socket.on("delete-notice", (deletedId) => {
      setNotices((prev) => prev.filter((notice) => notice._id !== deletedId));
    });

    // Cleanup listeners on unmount, this is necessary to prevent memory leaks and duplicate event listeners.
    return () => {
      socket.off("new-notice");
      socket.off("delete-notice");
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📌 Official Notices
      </motion.h2>

      <div className="flex flex-col space-y-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <motion.div
              key={notice._id} // Use _id instead of index
              className="bg-white p-4 rounded-md border-l-4 border-blue-500 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gray-800 font-medium">{notice.text}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notices available.</p>
        )}
      </div>
    </div>
  );
}
