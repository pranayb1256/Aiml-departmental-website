import { useState } from "react";
import { motion } from "framer-motion";
import { FaFlask, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

const aboutContent =
  "The AIML Department at Lokmanya Tilak College of Engineering is dedicated to fostering innovation in AI and Machine Learning. Our curriculum integrates cutting-edge research, industry exposure, and hands-on projects to empower students with real-world skills.";

const objectives = [
  {
    title: "Program Outcomes (POs)",
    icon: <FaBookOpen className="text-blue-600 text-2xl mr-2" />,
    content: [
      "Apply engineering knowledge to analyze problems and design AI/ML-based solutions.",
      "Demonstrate proficiency in software development, data analytics, and AI-driven problem-solving.",
      "Adhere to professional ethics and communicate effectively in multidisciplinary teams.",
      "Engage in lifelong learning and research in AI and ML fields.",
      "Develop AI models with real-world applications and assess their societal impact.",
    ],
  },
  {
    title: "Course Outcomes (COs)",
    icon: <FaChalkboardTeacher className="text-blue-600 text-2xl mr-2" />,
    content: [
      "Gain proficiency in machine learning algorithms, deep learning, and AI ethics.",
      "Understand data preprocessing techniques, model evaluation strategies, and optimization methods.",
      "Develop AI applications using frameworks such as TensorFlow and PyTorch.",
      "Acquire knowledge in cloud computing for AI and AI-driven decision-making techniques.",
      "Implement AI solutions for real-world case studies and projects.",
    ],
  },
];

const labs = [
  { name: "AI & ML Lab", room: "201", pcs: 30, equipment: "High-performance GPUs, TensorFlow-enabled machines", cost: "Rs.12,06,500.00" },
  { name: "Data Science Lab", room: "202", pcs: 25, equipment: "Python, R Studio, Hadoop cluster", cost: "Rs.10,22,400.00" },
  { name: "IoT Lab", room: "203", pcs: 20, equipment: "Arduino kits, Raspberry Pi, IoT sensors", cost: "Rs.12,29,000.00" },
  { name: "Algorithm & Data Structure Lab", room: "204", pcs: 20, equipment: "Processor – i5 (6-Core, 12M Cache, 2.9GHz to 4.3GHz), Memory: 8GB, Hard drive: 1TB", cost: "Rs.12,06,500.00" },
  { name: "Database Lab", room: "205", pcs: 20, equipment: "Processor – i5 (6-Core, 12M Cache, 2.9GHz to 4.3GHz), Memory: 8GB, Hard drive: 1TB", cost: "Rs.10,22,400.00" },
  { name: "Digital Electronics & Microprocessor Lab", room: "206", pcs: 20, equipment: "Processor – i5 (6-Core, 12M Cache, 2.9GHz to 4.3GHz), Memory: 8GB, Hard drive: 1TB", cost: "Rs.12,29,000.00" },
  { name: "Computer Graphics & Multimedia Lab", room: "207", pcs: 20, equipment: "Processor – i5 (6-Core, 12M Cache, 2.9GHz to 4.3GHz), Memory: 8GB, Hard drive: 1TB", cost: "Rs.10,21,400.00" },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <div className="relative p-12 text-center">
        <motion.h1 className="text-4xl font-bold" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          About <span className="text-blue-500">AIML Department</span>
        </motion.h1>
        <motion.p className="mt-4 text-lg max-w-4xl mx-auto leading-relaxed text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          {aboutContent}
        </motion.p>
      </div>

      {/* Objectives Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Objectives</h2>
        <div className="space-y-4">
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer flex items-center"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(selected === index ? null : index)}
            >
              {obj.icon}
              <h3 className="text-xl font-semibold flex-1">{obj.title}</h3>
              {selected === index ? "▲" : "▼"}
              {selected === index && (
                <motion.ul className="mt-2 text-gray-700 list-disc list-inside w-full" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.4 }}>
                  {obj.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Labs Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Department Labs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-6 py-3">S.No</th>
                <th className="border px-6 py-3">Lab Name</th>
                <th className="border px-6 py-3">Room No</th>
                <th className="border px-6 py-3">No. of PCs</th>
                <th className="border px-6 py-3">Equipment</th>
                <th className="border px-6 py-3">Laboratory Cost</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab, index) => (
                <tr key={index} className="border hover:bg-gray-100 transition-all">
                  <td className="border px-6 py-3 text-center">{index + 1}</td>
                  <td className="border px-6 py-3">{lab.name}</td>
                  <td className="border px-6 py-3 text-center">{lab.room}</td>
                  <td className="border px-6 py-3 text-center">{lab.pcs}</td>
                  <td className="border px-6 py-3">{lab.equipment}</td>
                  <td className="border px-6 py-3 text-right">{lab.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
