import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Users, FileText, ChevronRight } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Medical Diagnosis",
    description: "A deep learning model trained on X-ray images to detect pneumonia and other lung diseases with 95% accuracy.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "TensorFlow", "React"],
    team: ["Alice Johnson", "Bob Smith"],
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Smart Traffic Management System",
    description: "Computer vision application that optimizes traffic light timings based on real-time vehicle density analysis.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["OpenCV", "YOLOv8", "FastAPI"],
    team: ["Charlie Davis"],
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "Multilingual Customer Support Bot",
    description: "An LLM-based chatbot capable of resolving customer queries in 15+ regional languages using RAG.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["LangChain", "OpenAI", "Next.js"],
    team: ["Diana Prince", "Evan Wright"],
    github: "#",
    demo: "#"
  }
];

const mockResearch = [
  {
    id: 1,
    title: "Enhancing Transformer Efficiency in Low-Resource Environments",
    authors: "Dr. Alan Turing, Sarah Connor",
    journal: "IEEE Transactions on Artificial Intelligence",
    date: "August 2025",
    link: "#"
  },
  {
    id: 2,
    title: "A Novel Approach to Federated Learning in Healthcare",
    authors: "Dr. Grace Hopper, John Doe",
    journal: "Springer Machine Learning",
    date: "June 2025",
    link: "#"
  }
];

export default function Showcase() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Innovation & Research
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover cutting-edge projects built by our students and explore recent research publications from our faculty.
          </p>
        </motion.div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-sm inline-flex border border-gray-100">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "projects" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Code2 className="inline-block w-4 h-4 mr-2" />
              Student Projects
            </button>
            <button
              onClick={() => setActiveTab("research")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "research" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="inline-block w-4 h-4 mr-2" />
              Research Papers
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {mockProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="flex gap-3">
                        <a href={project.github} className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-900 transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                        <a href={project.demo} className="bg-blue-600/90 p-2 rounded-full hover:bg-blue-600 text-white transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 border-t border-gray-100 pt-4 mt-4">
                      <Users className="w-4 h-4 mr-2" />
                      {project.team.join(", ")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "research" && (
            <motion.div
              key="research"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {mockResearch.map((paper, idx) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold text-gray-800">Authors:</span> {paper.authors}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{paper.journal}</span>
                      <span>•</span>
                      <span>{paper.date}</span>
                    </div>
                  </div>
                  <a 
                    href={paper.link}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Read Paper
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
