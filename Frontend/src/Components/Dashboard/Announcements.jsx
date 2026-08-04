import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Save, Megaphone } from "lucide-react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  // Fetch Announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/admin/announcements`);
        const data = Array.isArray(res.data) ? res.data : res.data.announcements || [];
        setAnnouncements(data);
      } catch (err) {
        toast.error("Failed to fetch announcements");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Add Announcement
  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${apiUrl}/admin/announcements`,
        { text: newAnnouncement.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added new announcement successfully!");
      setAnnouncements([res.data.announcement, ...announcements]);
      setNewAnnouncement("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding announcement");
      console.error(err);
    }
  };

  // Delete Announcement
  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${apiUrl}/admin/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(announcements.filter((a) => a._id !== id));
      toast.success("Announcement deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting announcement");
      console.error(err);
    }
  };

  // Start Editing
  const startEditing = (announcement) => {
    setEditingAnnouncement(announcement._id);
    setEditText(announcement.text);
  };

  // Update Announcement
  const updateAnnouncement = async (id) => {
    if (!editText.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${apiUrl}/admin/announcements/${id}`,
        { text: editText.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnnouncements(announcements.map((a) => (a._id === id ? res.data.announcement : a)));
      setEditingAnnouncement(null);
      toast.success("Announcement updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating announcement");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Announcements
          </h1>
        </div>

        {/* Add Announcement Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Broadcast a new announcement..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={addAnnouncement}
              disabled={!newAnnouncement.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Broadcast</span>
            </button>
          </div>
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-10 animate-pulse">Loading announcements...</div>
          ) : announcements.length === 0 ? (
            <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-2xl">
              No announcements broadcasted yet.
            </div>
          ) : (
            <AnimatePresence>
              {announcements.map((ann) => (
                <motion.div
                  key={ann._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  {editingAnnouncement === ann._id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-gray-50 border border-blue-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setEditingAnnouncement(null)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                        <button
                          onClick={() => updateAnnouncement(ann._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                        >
                          <Save className="w-4 h-4" /> Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-slate-700 leading-relaxed flex-1 whitespace-pre-wrap">
                        {ann.text}
                      </p>
                      
                      {role === "superadmin" && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditing(ann)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Announcement"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(ann._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
