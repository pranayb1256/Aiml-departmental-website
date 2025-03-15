import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const clubDetails = {
  AIMSA: {
    name: "AI & Machine Learning Students' Association",
    instagram: "https://instagram.com/aimsa_official",
    banner: "/images/aimsa-banner.jpg",
  },
  CSI: {
    name: "Computer Society of India",
    instagram: "https://instagram.com/csi_club",
    banner: "/images/csi-banner.jpg",
  },
  ISTCE: {
    name: "Institution of Smart Technology and Computing Engineers",
    instagram: "https://instagram.com/istce_official",
    banner: "/images/istce-banner.jpg",
  },
};

const ClubMemberPage = () => {
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers(selectedClub);
  }, [selectedClub]);

  const fetchMembers = async (club) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/member/${club}`);
      console.log(`API Response for ${club}:`, res.data);
      setMembers(res.data?.members || []);
    } catch (error) {
      console.error(`Error fetching ${club} members:`, error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const positionHierarchy = [
    "President",
    "Vice President",
    "General Secretary",
    "Treasurer",
    "Creative Head",
    "Technical Head",
    "Publicity Head",
    "Magazine & Newsletter Head",
    "Marketing Head",
    "Event Coordinator",
    "Member",
    "PUBLICITY & SPONSORSHIP",
    "CO - TECHNICAL SECRETARY",
    "PHOTOGRAPHY",
    "TEAM MEMBERS"
  ];

  const groupedMembers = members.reduce((acc, member) => {
    const normalizedPosition = member.position.toLowerCase(); // Convert to lowercase
    acc[normalizedPosition] = acc[normalizedPosition] || [];
    acc[normalizedPosition].push(member);
    return acc;
  }, {});

  const positionMapping = positionHierarchy.reduce((map, position) => {
    map[position.toLowerCase()] = position; // Map lowercase to original format
    return map;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Club Banner */}
      <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-2xl">
        <img
          src={clubDetails[selectedClub].banner}
          alt={`${selectedClub} Banner`}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold">{clubDetails[selectedClub].name}</h1>
            <a
              href={clubDetails[selectedClub].instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 px-5 py-2 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
            >
              <FaInstagram className="text-2xl" />
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Club Selection */}
      <div className="flex justify-center gap-6 mt-8 mb-12">
        {Object.keys(clubDetails).map((club) => (
          <motion.button
            key={club}
            whileHover={{ scale: 1.1 }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg text-lg ${
              selectedClub === club ? "bg-blue-600 text-white shadow-xl" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedClub(club)}
          >
            {club}
          </motion.button>
        ))}
      </div>

      {/* Members Section */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading members...</p>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No members found for this club.</p>
      ) : (
        <div className="space-y-14">
          {positionHierarchy.map((position) => {
            const positionKey = position.toLowerCase();
            if (groupedMembers[positionKey]) {
              return (
                <div key={position}>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center border-b pb-2">
                    {positionMapping[positionKey]}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    {groupedMembers[positionKey].map((member) => (
                      <motion.div
                        key={member._id}
                        whileHover={{ scale: 1.05 }}
                        className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition-all hover:shadow-2xl w-72 border border-gray-200 hover:border-blue-400"
                      >
                        <div className="absolute -top-8">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                          />
                        </div>
                        <div className="mt-12 text-center">
                          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                          <p className="text-gray-600 text-sm">{member.position}</p>
                          <div className="flex gap-4 mt-4">
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:scale-110 transition">
                                <FaLinkedin />
                              </a>
                            )}
                            {member.instagram && (
                              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 text-2xl hover:scale-110 transition">
                                <FaInstagram />
                              </a>
                            )}
                            {member.github && (
                              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-900 text-2xl hover:scale-110 transition">
                                <FaGithub />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default ClubMemberPage;
