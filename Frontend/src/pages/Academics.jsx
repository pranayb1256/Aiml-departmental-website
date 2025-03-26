import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FaCalendarAlt, FaClock, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../Components/index";

const Academics = () => {
  const [selectedYear, setSelectedYear] = useState("FE");
  const [showResults, setShowResults] = useState(false);
  const [timetableUrl, setTimetableUrl] = useState("");
  const [resultData, setResultData] = useState({
    passPercentage: 0,
    totalStudents: 0,
    passedStudents: 0,
    failedStudents: 0,
    topper: { name: "", percentage: 0, image: "" },
  });

  useEffect(() => {
    fetch(`/api/timetable/${selectedYear}/current`)
      .then((res) => res.json())
      .then((data) => setTimetableUrl(data.url))
      .catch(() => setTimetableUrl(""));
  }, [selectedYear]);

  useEffect(() => {
    fetch(`/api/result?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setResultData({
            passPercentage: data.passPercentage || 0,
            totalStudents: data.totalStudents || 0,
            passedStudents: data.passedStudents || 0,
            failedStudents: data.failedStudents || 0,
            topper: data.topper || { name: "Not Available", percentage: 0, image: "" },
          });
        }
      })
      .catch(() => setResultData({ passPercentage: 0, totalStudents: 0, passedStudents: 0, failedStudents: 0, topper: { name: "", percentage: 0, image: "" } }));
  }, [selectedYear]);

  const toggleResults = () => setShowResults(!showResults);

  const chartData = {
    labels: ["Pass Percentage", "Total Students", "Passed", "Failed"],
    datasets: [
      {
        label: `${selectedYear} Performance`,
        data: [resultData.passPercentage, resultData.totalStudents, resultData.passedStudents, resultData.failedStudents],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <motion.h1 className="text-center text-4xl font-bold mb-8 text-gray-800" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Academics - <span className="text-blue-500">AIML</span>
      </motion.h1>

      <div className="flex justify-center gap-4 mb-6">
        {["FE", "SE", "TE", "BE"].map((year) => (
          <Button key={year} className={`px-4 py-2 rounded ${selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setSelectedYear(year)}>
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
        <Button onClick={toggleResults} className="px-6 py-2 bg-green-500 text-white rounded flex items-center gap-2">
          {showResults ? <FaToggleOn /> : <FaToggleOff />} Show Result Analysis
        </Button>
      </div>

      {showResults && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 text-center">Performance Statistics</h3>
          <Bar data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />

          {/* Topper Info Section */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700">Topper</h3>
            <p className="text-lg text-gray-600">{resultData.topper.name} - {resultData.topper.percentage}%</p>
            {resultData.topper.image && (
              <img src={resultData.topper.image} alt="Topper" className="w-32 h-32 object-cover rounded-full mx-auto mt-3 border border-gray-300 shadow-md" />
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
