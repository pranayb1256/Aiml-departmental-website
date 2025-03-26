import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { FaCalendarAlt, FaClock, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Button } from "../Components/index";
import axios from "axios";
import { message } from "antd";

const Academics = () => {
    const [showResults, setShowResults] = useState(false);
    const [year, setYear] = useState("FE");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [timetables, setTimetables] = useState({});

    useEffect(() => {
        fetchResults();
        fetchAllTimetables();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:8001/api/result`);
            setResults(data);
        } catch (error) {
            message.error("Failed to fetch academic results");
        }
        setLoading(false);
    };

    const fetchAllTimetables = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/academics");
            const formattedTimetables = {};

            response.data.timetables.forEach(({ year, semester, url }) => {
                if (!formattedTimetables[year]) {
                    formattedTimetables[year] = {};
                }
                formattedTimetables[year][semester] = url;
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
                {["FE", "SE", "TE", "BE"].map((yr) => (
                    <Button
                        key={yr}
                        className={`px-4 py-2 rounded ${year === yr ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        onClick={() => setYear(yr)}
                    >
                        {yr}
                    </Button>
                ))}
            </div>

            <Toppers selectedResult={selectedResult} year={year} />

            <Section title="Academic Calendar" icon={<FaCalendarAlt className="text-red-500" />}>
                <a href="/calendar/academic_calendar.pdf" className="text-blue-500 hover:underline" download>
                    Download Academic Calendar
                </a>
            </Section>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold flex items-center text-gray-700 mb-4">
                    <FaClock className="text-blue-500 mr-2" /> Timetable
                </h2>
                {timetables[year] ? (
                    <div>
                        {Object.keys(timetables[year])
                            .sort((a, b) => a - b)
                            .map((sem) => (
                                <p key={sem} className="mb-2">
                                    Semester {sem}: {timetables[year][sem] ? (
                                        <a href={timetables[year][sem]} className="text-blue-500 hover:underline" download>
                                            Download
                                        </a>
                                    ) : (
                                        "NA"
                                    )}
                                </p>
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
                    <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Performance Statistics</h3>
                    <Bar data={chartData} options={{ maintainAspectRatio: true, responsive: true }} />
                </motion.div>
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
            <h3 className="text-lg font-semibold text-gray-700">{selectedResult.topperName || "TBA"}</h3>
            <p className="text-gray-600">CGPA: {selectedResult.topperCgpa || "N/A"}</p>
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