import { useState, useEffect } from "react";
import { Card } from "../Components/ui/card";
import { FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const placementTrendData = [
  { year: "2020", studentsPlaced: 45, highestPackage: 8 },
  { year: "2021", studentsPlaced: 60, highestPackage: 10 },
  { year: "2022", studentsPlaced: 85, highestPackage: 14 },
  { year: "2023", studentsPlaced: 110, highestPackage: 18 },
];

const domainData = [
  { name: "Data Science", value: 35 },
  { name: "Machine Learning", value: 25 },
  { name: "Full Stack (SDE)", value: 25 },
  { name: "Cloud/DevOps", value: 15 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AIML Department Placements & Careers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Empowering students with cutting-edge AI and ML career opportunities in top tech companies.
          </p>
        </motion.div>
      </section>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Placement Statistics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 bg-white">
            <h3 className="text-xl font-semibold text-gray-900">Placed Students</h3>
            <p className="text-gray-600 text-2xl mt-2 font-bold">{placementStats.placedPercentage}</p>
          </Card>
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 bg-white">
            <h3 className="text-xl font-semibold text-gray-900">Highest Package</h3>
            <p className="text-gray-600 text-2xl mt-2 font-bold">{placementStats.highestPackage}</p>
          </Card>
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500 bg-white">
            <h3 className="text-xl font-semibold text-gray-900">Average Package</h3>
            <p className="text-gray-600 text-2xl mt-2 font-bold">{placementStats.averagePackage}</p>
          </Card>
        </div>
      </section>

      {/* Interactive Analytics Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Placement Analytics</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md bg-white border border-gray-100">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">Year-over-Year Placements</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="year" stroke="#4b5563" />
                  <YAxis stroke="#4b5563" />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#111827" }} />
                  <Legend />
                  <Bar dataKey="studentsPlaced" name="Students Placed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="highestPackage" name="Highest Package (LPA)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 shadow-md bg-white border border-gray-100">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">Top Recruiting Domains</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domainData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {domainData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#111827" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      <section className="mb-12 text-center bg-gray-50 border border-gray-100 p-8 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Mandatory Internship Policy</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
          As per AICTE norms, every engineering student must complete internships during their 4-year course. Failure to do so may result in not receiving the degree certificate.
        </p>
        <a href="https://www.aicte-ndia.org/sites/default/files/Aicte%20Internship%20Policy-%2002.04.2019.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-600 font-medium hover:underline">
          View AICTE Internship Policy
        </a>
      </section>
    </div>
  );
};

export default Placements;
