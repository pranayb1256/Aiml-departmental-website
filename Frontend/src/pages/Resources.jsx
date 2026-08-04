import React, { useState } from "react";
import { motion } from "framer-motion";
import { Book, FileText, Download, Search, FileCode2 } from "lucide-react";

// Mock Data for Resources
const mockResources = [
  { id: 1, title: "AIML Semester 3 Syllabus", type: "Syllabus", semester: "3", subject: "All", size: "2.4 MB" },
  { id: 2, title: "AIML Semester 4 Syllabus", type: "Syllabus", semester: "4", subject: "All", size: "2.1 MB" },
  { id: 3, title: "Data Structures & Algorithms PYQ 2023", type: "PYQ", semester: "3", subject: "DSA", size: "1.2 MB" },
  { id: 4, title: "Machine Learning Foundations PYQ 2023", type: "PYQ", semester: "4", subject: "ML", size: "1.8 MB" },
  { id: 5, title: "Python Programming Lab Manual", type: "Lab Manual", semester: "3", subject: "Python", size: "3.5 MB" },
  { id: 6, title: "Database Management Systems Lab Manual", type: "Lab Manual", semester: "4", subject: "DBMS", size: "4.1 MB" },
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Syllabus", "PYQ", "Lab Manual"];

  const filteredResources = mockResources.filter((res) => {
    const matchesTab = activeTab === "All" || res.type === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getIcon = (type) => {
    switch(type) {
      case "Syllabus": return <Book className="w-6 h-6 text-blue-500" />;
      case "PYQ": return <FileText className="w-6 h-6 text-orange-500" />;
      case "Lab Manual": return <FileCode2 className="w-6 h-6 text-green-500" />;
      default: return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Student Resource Hub
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Download syllabi, previous year question papers, and lab manuals.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="Search by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, idx) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center p-3 rounded-lg bg-gray-50">
                    {getIcon(resource.type)}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Sem {resource.semester}
                  </span>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Subject: {resource.subject}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {resource.size}
                  </span>
                  <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No resources found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
