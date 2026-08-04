import React, { useState, useEffect } from "react";
import { Search, FileText, Code2, Users, Calendar, ArrowRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const searchData = [
  { id: 1, name: "Resources & PYQs", path: "/Resources", icon: FileText, category: "Academic" },
  { id: 2, name: "Student Showcase", path: "/Showcase", icon: Code2, category: "Academic" },
  { id: 3, name: "Verify Certificate", path: "/verify-certificate", icon: Award, category: "Academic" },
  { id: 4, name: "Faculty Directory", path: "/Teaching", icon: Users, category: "People" },
  { id: 5, name: "Upcoming Events", path: "/Event", icon: Calendar, category: "Campus" },
  { id: 6, name: "Placement Analytics", path: "/Placements", icon: ArrowRight, category: "Career" },
  { id: 7, name: "Admin Dashboard", path: "/login", icon: Users, category: "Admin" },
];

export default function CommandPalette({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const filteredData = searchData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent border-0 focus:ring-0 px-3 text-gray-900 placeholder-gray-400 outline-none"
            placeholder="Search resources, faculty, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 text-xs font-medium text-gray-400 bg-gray-100 rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  <span>{item.name}</span>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-blue-400">{item.category}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
