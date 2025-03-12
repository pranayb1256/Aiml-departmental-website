import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../Components/ui/card";
import {
  FaUniversity,
  FaBriefcase,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaMicrochip,
  FaDatabase,
  FaBrain,
  FaNewspaper,
  FaBuilding,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Placements = () => {
  const [placementStats, setPlacementStats] = useState({
    placedPercentage: "Loading...",
    highestPackage: "Loading...",
    averagePackage: "Loading...",
  });

  const careerDetails = {
    "AI Engineer": {
      description:
        "AI Engineers build and deploy artificial intelligence models, optimizing systems for automation and decision-making.",
      additionalInfo:
        "Key Skills: Python, Deep Learning, TensorFlow, PyTorch, AI Ethics.\nCareer Growth: Senior AI Engineer, AI Architect, AI Research Scientist.",
      link: "https://ai.google/research/",
    },
    "Data Scientist": {
      description:
        "Data Scientists analyze data to extract meaningful insights, design machine learning models, and drive AI applications.",
      additionalInfo:
        "Key Skills: Python, R, Machine Learning, SQL, Big Data.\nCareer Growth: Senior Data Scientist, Data Science Manager, Chief Data Officer.",
      link: "https://www.coursera.org/articles/how-to-become-a-data-scientist",
    },
    "ML Engineer": {
      description:
        "ML Engineers develop and optimize machine learning models for real-world applications and scalable AI solutions.",
      additionalInfo:
        "Key Skills: TensorFlow, PyTorch, Cloud Computing, Model Deployment.\nCareer Growth: Senior ML Engineer, ML Architect, AI Engineer.",
      link: "https://towardsdatascience.com/how-to-become-an-ml-engineer",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setPlacementStats({
        placedPercentage: "90%",
        highestPackage: "₹18 LPA",
        averagePackage: "₹8 LPA",
      });
    }, 1500);
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <section className="text-center py-20">
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaBrain className="text-6xl text-blue-600 animate-pulse mb-4" />
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            AIML Department Placements & Careers
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Empowering students with cutting-edge AI and ML career opportunities in top tech companies worldwide.
          </p>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        {Object.keys(careerDetails).map((career) => (
          <motion.div key={career} className="relative" whileHover={{ scale: 1.05 }}>
            <Card className="shadow-lg p-6 border-l-4 border-blue-500 cursor-pointer">
              <CardContent className="flex items-center gap-4">
                <FaMicrochip className="text-4xl text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold text-blue-900">{career}</h2>
                  <p className="text-gray-600">Explore AI & ML career paths</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Placement Statistics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-900">Placed Students</h3>
            <p className="text-gray-700">{placementStats.placedPercentage}</p>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-blue-900">Highest Package</h3>
            <p className="text-gray-700">{placementStats.highestPackage}</p>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-blue-900">Average Package</h3>
            <p className="text-gray-700">{placementStats.averagePackage}</p>
          </Card>
        </div>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Top Hiring Companies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <FaBuilding className="text-4xl text-gray-500 mb-2" />
            <h3 className="text-xl font-semibold text-blue-900">Google</h3>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <FaBuilding className="text-4xl text-gray-500 mb-2" />
            <h3 className="text-xl font-semibold text-blue-900">Microsoft</h3>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <FaBuilding className="text-4xl text-gray-500 mb-2" />
            <h3 className="text-xl font-semibold text-blue-900">Amazon</h3>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Placements;