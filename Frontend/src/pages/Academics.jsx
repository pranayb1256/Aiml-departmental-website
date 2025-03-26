import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FaCalendarAlt, FaClock, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../Components/index";
import axios from "axios";
import { message } from "antd";

const Academics = () => {
  const [selectedYear, setSelectedYear] = useState("FE");
  const [showResults, setShowResults] = useState(false);
  const [timetableUrl, setTimetableUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResults();
    fetchTimetable();
  }, [selectedYear]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/result?year=${selectedYear}`);
      setResults(data);
    } catch (error) {
      message.error("Failed to fetch academic results");
    }
    setLoading(false);
  };

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`/api/timetable/${selectedYear}/current`);
      setTimetableUrl(response.data.url);
    } catch (error) {
      setTimetableUrl("");
    }
  };

  const toggleResults = () => setShowResults(!showResults);
  const selectedResult = results.length > 0 ? results[0] : {};

  const chartData = {
    labels: ["Pass %", "Total Students", "Passed", "Failed"],
    datasets: [
      {
        label: `${selectedYear} Performance`,
        data: [
          selectedResult.passPercentage || 0,
          selectedResult.totalStudents || 0,
          selectedResult.passedStudents || 0,
          selectedResult.failedStudents || 0,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-center text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Academics - <span className="text-blue-500">AIML</span>
      </motion.h1>

      <div className="flex justify-center gap-4 mb-6">
        {["FE", "SE", "TE", "BE"].map((year) => (
          <Button
            key={year}
            className={`px-4 py-2 rounded ${selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </div>

      <Section title="Academic Calendar" icon={<FaCalendarAlt className="text-red-500" />}>
        <a href="/calendar/academic_calendar.pdf" className="text-blue-500 hover:underline" download>
          Download Academic Calendar
        </a>
      </Section>

      <Section title="Timetable" icon={<FaClock className="text-blue-500" />}>
        {timetableUrl ? (
          <a href={timetableUrl} className="text-blue-500 hover:underline" download>
            Download {selectedYear} Timetable
          </a>
        ) : (
          <p className="text-gray-500">No timetable available</p>
        )}
      </Section>

      <div className="flex justify-center mt-6">
        <Button
          onClick={toggleResults}
          className="px-6 py-2 bg-green-500 text-white rounded flex items-center gap-2"
        >
          {showResults ? <FaToggleOn /> : <FaToggleOff />} Show Result Analysis
        </Button>
      </div>

      {showResults && selectedResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg"
        >
          <h3 className="text-xl font-semibold text-gray-700 text-center">Performance Statistics</h3>
          <Bar data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700">Topper</h3>
            <p className="text-lg text-gray-600">
              {selectedResult.topper?.name} - {selectedResult.topper?.percentage}%
            </p>
            {selectedResult.topper?.image && (
              <img
                src={selectedResult.topper.image}
                alt="Topper"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-3 border border-gray-300 shadow-md"
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold flex items-center text-gray-700 mb-4">
      {icon} <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

export default Academics;
