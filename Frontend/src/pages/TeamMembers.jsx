import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card.jsx";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const members = [
  {
    category: "President",
    members: [
      {
        name: "John Doe",
        yearBranch: "TE - AIML",
        position: "President",
        photo: "../../public/Photos/Avatar11.jpg",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
    ],
  },
  {
    category: "Vice President",
    members: [
      {
        name: "Jane Smith",
        yearBranch: "SE - AIML",
        position: "Vice President",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Jane Smith",
        yearBranch: "SE - AIML",
        position: "Vice President",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
    ],
  },
  {
    category: "Team Members",
    members: [
      {
        name: "Alice Brown",
        yearBranch: "TE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Alice Brown",
        yearBranch: "TE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Alice Brown",
        yearBranch: "TE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Alice Brown",
        yearBranch: "TE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Alice Brown",
        yearBranch: "TE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
      {
        name: "Bob Green",
        yearBranch: "BE - AIML",
        position: "Member",
        photo: "https://via.placeholder.com/150",
        linkedin: "#",
        instagram: "#",
        github: "#",
      },
    ],
  },
];

const waveVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 50 },
  }),
};

const ClubMemberPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Club Members</h1>
      {members.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">{section.category}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {section.members.map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={waveVariants}
                className="w-64"
              >
                <Card className="shadow-lg rounded-2xl bg-white overflow-hidden">
                  <div className="flex justify-center mt-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.yearBranch}</p>
                    <p className="text-sm font-medium text-gray-700">{member.position}</p>
                    <div className="flex justify-center mt-3 space-x-4 text-gray-600">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-xl hover:text-blue-600" />
                      </a>
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-xl hover:text-pink-500" />
                      </a>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-xl hover:text-gray-800" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubMemberPage;


