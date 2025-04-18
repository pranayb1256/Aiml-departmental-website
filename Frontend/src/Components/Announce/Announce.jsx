import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

export default function Announce() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const socket = io("https://aiml-departmental-website-n.onrender.com");

        fetch("/api/admin/announcements")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data); // Debugging
                setAnnouncements(Array.isArray(data) ? data : data.announcements || []);
            })
            .catch((err) => console.error("Error fetching announcements:", err));

        // Listen for new announcements
        socket.on("new-announcement", (newAnnouncement) => {
            setAnnouncements((prev) => [newAnnouncement, ...prev]); // Add new announcement at the top
        });

        // Listen for deleted announcements
        socket.on("delete-announcement", (deletedId) => {
            setAnnouncements((prev) => prev.filter((announcement) => announcement._id !== deletedId));
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off("new-announcement");
            socket.off("delete-announcement");
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
                📢 Latest Announcements
            </motion.h2>

            <div className="flex flex-col space-y-4">
                {announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-4 rounded-md border-l-4 border-green-500 shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <p className="text-gray-800 font-medium">{announcement.text}</p>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No announcements available.</p>
                )}
            </div>
        </div>
    );
}
