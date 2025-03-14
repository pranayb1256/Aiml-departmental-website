import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const ClubMemberPage = () => {
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers(selectedClub);
  }, [selectedClub]);

  const fetchMembers = async (club) => {
    try {
      const res = await axios.get(`/api/member/${club}`);
      setMembers(res.data.members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{selectedClub} <span className="text-blue-500">Club Members</span></h1>

      {/* Club Selection */}
    <div className="flex justify-center gap-4 mb-8">
  {["AIMSA", "CSI", "ISTCE"].map((club) => (
    <motion.button
      key={club}
      whileHover={{ scale: 1.1 }}
      className={`px-5 py-2 rounded-lg font-medium transition-all shadow-md ${
        selectedClub === club
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
      }`}
      onClick={() => setSelectedClub(club)}
    >
      <span>{club}</span>
    </motion.button>
  ))}
</div>


      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member) => (
          <motion.div
            key={member._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transition-all hover:shadow-lg"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-900">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.position}</p>
            <div className="flex gap-4 mt-3">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-600 text-2xl hover:scale-110 transition" />
                </a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition" />
                </a>
              )}
              {member.github && (
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-gray-800 text-2xl hover:scale-110 transition" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {members.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No members found for this club.</p>
      )}
    </div>
  );
};

export default ClubMemberPage;
