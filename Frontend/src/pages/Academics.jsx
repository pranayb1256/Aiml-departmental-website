import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  FaCalendarAlt,
  FaClock,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { Button } from "../Components/index";
import axios from "axios";
import { message } from "antd";

const Academics = () => {
  const [showResults, setShowResults] = useState(false);
  const [year, setYear] = useState("FE");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timetables, setTimetables] = useState({});
  const [modalImage, setModalImage] = useState(null); // for magnify view
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetchResults();
    fetchAllTimetables();
    const fetchCalendar = async () => {
      try {
        const res = await axios.get(`${apiUrl}/academics/calender`);
        if (res.data && res.data.length > 0) {
          const filtered = res.data.find((item) => item.yearLevel === year);
          setCalendar(filtered || null);
        }
      } catch (error) {
        console.error("Error fetching academic calendar:", error);
      }
    };
    fetchCalendar();
  }, [year]);

  const fetchResults = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/result`);
      setResults(data);
    } catch (error) {
      message.error("Failed to fetch academic results");
    }
    setLoading(false);
  };

  const fetchAllTimetables = async () => {
    try {
    const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.get(`${apiUrl}/academics/timetable`);
      const formattedTimetables = {};

      response.data.timetables.forEach(({ year, semester, urlA, urlB }) => {
        if (!formattedTimetables[year]) {
          formattedTimetables[year] = {};
        }
        formattedTimetables[year][semester] = { urlA, urlB };
      });

      setTimetables(formattedTimetables);
    } catch (error) {
      console.error("Failed to fetch timetables", error);
    }
  };

  const toggleResults = () => setShowResults(!showResults);
  const selectedResult = results.find((r) => r.year === year) || {};

  const chartData = {
    labels: ["Pass %", "Total Students", "Passed", "Failed"],
    datasets: [
      {
        label: `${year} Performance`,
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
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <motion.h1
        className="text-center text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Academics - <span className="text-blue-500">AIML</span>
      </motion.h1>

      <div className="flex justify-center gap-4 mb-6">
        {["FE", "SE", "TE", "BE"].map((yr) => (
          <Button
            key={yr}
            className={`px-4 py-2 rounded ${
              year === yr ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setYear(yr)}
          >
            {yr}
          </Button>
        ))}
      </div>

      <Toppers selectedResult={selectedResult} year={year} />
      <section className="bg-white shadow-md rounded-lg p-6 my-6">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="text-red-500 text-xl" />
          <h2 className="text-xl font-semibold">Academic Calendar</h2>
        </div>

        {calendar ? (
          <a
            href={`${calendar.pdfUrl}#toolbar=0`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            {calendar.title || `View Academic Calendar for ${year}`}
          </a>
        ) : (
          <p className="text-gray-500">
            No academic calendar available for {year}.
          </p>
        )}
      </section>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center text-gray-700 mb-4">
          <FaClock className="text-blue-500 mr-2" /> Timetable
        </h2>
        {timetables[year] ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(timetables[year])
              .sort((a, b) => a - b)
              .map((sem) => (
                <div key={sem} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Semester {sem}
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {["urlA", "urlB"].map((divKey, idx) => {
                      const divName = idx === 0 ? "Division A" : "Division B";
                      const imgUrl = timetables[year][sem]?.[divKey];

                      return imgUrl ? (
                        <div
                          key={divKey}
                          className="flex flex-col items-center text-center bg-gray-100 p-4 rounded-lg w-full max-w-md"
                        >
                          <p className="text-sm font-semibold text-gray-700 mb-3">
                            {divName}
                          </p>
                          <div className="relative group">
                            <img
                              src={imgUrl}
                              alt={`Semester ${sem} - ${divName}`}
                              onClick={() => setModalImage(imgUrl)}
                              className="w-[500px] max-w-full h-auto object-contain rounded-lg border border-gray-300 shadow-md cursor-pointer transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded hidden group-hover:block">
                              Click to magnify
                            </span>
                          </div>
                          <a
                            href={imgUrl}
                            download
                            className="text-blue-600 text-sm underline hover:text-blue-800 mt-4 transition"
                          >
                            Download {divName}
                          </a>
                        </div>
                      ) : (
                        <p
                          key={divKey}
                          className="text-gray-500 text-center w-full"
                        >
                          {divName}: Not Available
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No timetable available</p>
        )}
      </div>

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
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Performance Statistics
          </h3>
          <Bar
            data={chartData}
            options={{ maintainAspectRatio: true, responsive: true }}
          />
        </motion.div>
      )}

      {/* Modal for timetable magnify view */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Magnified timetable"
              className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Toppers = ({ selectedResult, year }) => (
  <div className="mt-6 text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Topper - {year}</h2>
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-72 mx-auto">
      {selectedResult.topperImage ? (
        <img
          src={selectedResult.topperImage}
          alt={selectedResult.topperName}
          className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md mb-4"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-700">
        {selectedResult.topperName || "TBA"}
      </h3>
      <p className="text-gray-600">
        CGPA: {selectedResult.topperCgpa || "N/A"}
      </p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold flex items-center text-gray-700 mb-4">
      {icon} <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

export default Academics;
