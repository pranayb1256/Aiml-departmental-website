import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Upload, Megaphone, AlertCircle, Calendar, 
  Users, Activity, FileText, LayoutDashboard, ChevronRight, GraduationCap, Award, Menu
} from "lucide-react";

// Lazy-loaded components
const Announcements = lazy(() => import("../Components/Dashboard/Announcements"));
const Notices = lazy(() => import("../Components/Dashboard/Notices"));
const ClubEvents = lazy(() => import("../Components/Dashboard/ClubEvents"));
const Member = lazy(() => import("../Components/Dashboard/Member"));
const AuditLogs = lazy(() => import("../Components/Dashboard/Audit"));
const TimetableManager = lazy(() => import("../Components/Dashboard/Timetable"));
const PlacedStudent = lazy(() => import("../Components/Dashboard/PlacedStudent"));
const Result = lazy(() => import("../Components/Dashboard/Result"));
const Analytics = lazy(() => import("../Components/Dashboard/Analytics"));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "faculty";
  const [activeTab, setActiveTab] = useState(
    Number(localStorage.getItem("tabIndex")) || 0
  );
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const tabs = [
    { id: 0, label: "Announcements", icon: <Megaphone className="w-5 h-5" /> },
    { id: 1, label: "Notices", icon: <AlertCircle className="w-5 h-5" /> },
    { id: 2, label: "Club Events", icon: <Calendar className="w-5 h-5" /> },
    { id: 3, label: "Members", icon: <Users className="w-5 h-5" /> },
    { id: 5, label: "Timetable", icon: <Calendar className="w-5 h-5" /> },
    { id: 6, label: "Placed Students", icon: <GraduationCap className="w-5 h-5" /> },
    { id: 7, label: "Results", icon: <Award className="w-5 h-5" /> },
    { id: 8, label: "Analytics", icon: <Activity className="w-5 h-5" /> },
  ];

  if (role === "superadmin") {
    tabs.push({ id: 4, label: "Audit Logs", icon: <FileText className="w-5 h-5" /> });
  }

  // Sort tabs by ID to keep them in order
  tabs.sort((a, b) => a.id - b.id);

  // Auto-align sidebar with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    localStorage.setItem("tabIndex", index);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleBulkUpload = () => {
    document.getElementById('csv-upload').click();
  };

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      toast.success(`Mocked import of ${e.target.files[0].name}`);
    }
  };

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post(`${apiUrl}/admin/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }

      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={`absolute md:relative h-full bg-white border-r border-gray-200 flex flex-col z-30 transition-transform duration-300 shadow-sm ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 flex items-center gap-4 h-24 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-500 capitalize font-medium">{role} Account</p>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                }`}
              >
                <div className={`shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}>
                  {tab.icon}
                </div>
                {sidebarOpen && (
                  <span className="whitespace-nowrap">{tab.label}</span>
                )}
                {isActive && sidebarOpen && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2 hidden md:block">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 sm:h-24 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="hidden sm:block text-sm text-slate-500">Manage your departmental data</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input 
              type="file" 
              id="csv-upload" 
              accept=".csv,.xlsx" 
              className="hidden" 
              onChange={onFileChange}
            />
            <button
              onClick={handleBulkUpload}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-colors border border-gray-200 shadow-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Bulk Import</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100 font-semibold"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-full"
              >
                {activeTab === 0 && <Announcements />}
                {activeTab === 1 && <Notices />}
                {activeTab === 2 && <ClubEvents />}
                {activeTab === 3 && <Member />}
                {activeTab === 4 && <AuditLogs />}
                {activeTab === 5 && <TimetableManager />}
                {activeTab === 6 && <PlacedStudent />}
                {activeTab === 7 && <Result />}
                {activeTab === 8 && <Analytics />}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
