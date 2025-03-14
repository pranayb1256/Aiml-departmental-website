import { useState, useEffect } from "react";
import { Card } from "../Components/ui/card";
import { FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

const Placements = () => {
  const [placementStats, setPlacementStats] = useState({
    placedPercentage: "Loading...",
    highestPackage: "Loading...",
    averagePackage: "Loading...",
  });

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
            Empowering students with cutting-edge AI and ML career opportunities in top tech companies.
          </p>
        </motion.div>
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
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Mandatory Internship Policy</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
          As per AICTE norms, every engineering student must complete internships during their 4-year course. Failure to do so may result in not receiving the degree certificate.
        </p>
        <a href="https://www.aicte-ndia.org/sites/default/files/Aicte%20Internship%20Policy-%2002.04.2019.pdf" target="_blank" className="text-blue-600 underline">
          AICTE Internship Policy – 02.04.2019
        </a>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Training & Placement Committee</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Dr. Prerana Shrivastava</h3>
            <p className="text-gray-700">Training and Placement Officer</p>
            <p className="text-gray-700">Mobile: 9820319770</p>
            <p className="text-gray-700">Email: Ltcoe.tpo@gmail.com</p>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Dr. Jayesh Dange</h3>
            <p className="text-gray-700">Dean Training and Entrepreneurship Cell</p>
            <p className="text-gray-700">Email: jayesh.dange111@gmail.com</p>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Training Activities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Technical Training</h3>
            <p className="text-gray-700">Dr. Smita S. Ambarkar, Prof. Vrushali Bendre, Prof. Krishna Dwivedi, Prof. Ujjawala Tade</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Technical Seminars / Webinars</li>
              <li>Technical Workshops</li>
              <li>Technical Trainings</li>
            </ul>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Mock Tests</h3>
            <p className="text-gray-700">Prof. Savitha Devaraj, Prof. Rakhi D. Akhare, Prof. Ujjawala Pandarkar, Prof. Devidas Chikhale</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Mock Aptitude Tests</li>
              <li>Mock Programming Tests</li>
              <li>Mock Technical Tests</li>
            </ul>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Soft Skills & Interview Preparation</h3>
            <p className="text-gray-700">Prof. Geetha G, Dr. Rashmi Rani</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Soft Skills Training Workshops</li>
              <li>Group Discussion Trainings</li>
              <li>Personal Interview Trainings</li>
            </ul>
          </Card>
          <Card className="p-6 shadow-lg border-l-4 border-gray-500">
            <h3 className="text-xl font-semibold text-blue-900">Career Guidance</h3>
            <p className="text-gray-700">Prof. Rekha Sonavane, Prof. Swati Chaudhary, Prof. Sheshmal S. Shingne</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Career Guidance Seminars / Webinars</li>
              <li>GATE / MBA / MS / GRE / IELTS / Competitive Exams Preparation</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Placements;
