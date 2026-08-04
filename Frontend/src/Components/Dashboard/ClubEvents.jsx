import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, Trash2, Calendar, MapPin, Users, Info, Plus } from "lucide-react";

dayjs.extend(utc);
dayjs.extend(timezone);

const clubOptions = ["AIMSA", "CSI", "ISTCE"];
const eventTypes = ["Workshop", "Hackathon", "Seminar", "Conference", "Meetup"];
const convertToIST = (date) => dayjs.utc(date).tz("Asia/Kolkata").format("DD/MM/YYYY hh:mm A");

const ClubEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role");
  const [newEvent, setNewEvent] = useState({
    clubName: "AIMSA",
    eventType: "Workshop",
    dateTime: "",
    venue: "",
    description: "",
    guestSpeaker: "",
    imageFiles: [],
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/events`);
      setEvents(res.data.events || []);
    } catch (err) {
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Event deleted successfully!");
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (err) {
      toast.error("Failed to delete event.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setNewEvent((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newFiles],
    }));
  }, []);

  const removeImage = (index) => {
    setNewEvent((prev) => {
      const updatedFiles = prev.imageFiles.filter((_, i) => i !== index);
      // Clean up memory
      URL.revokeObjectURL(prev.imageFiles[index].preview);
      return { ...prev, imageFiles: updatedFiles };
    });
  };

  const handleSubmit = async () => {
    if (!newEvent.clubName || !newEvent.dateTime || !newEvent.venue || !newEvent.description) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("clubName", newEvent.clubName);
      formData.append("dateTime", newEvent.dateTime);
      formData.append("venue", newEvent.venue);
      formData.append("description", newEvent.description);
      formData.append("guestSpeaker", newEvent.guestSpeaker || "");
      formData.append("eventType", newEvent.eventType);

      newEvent.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API_URL}/events`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
        },
      });

      setEvents((prev) => [response.data.newEvent, ...prev]);

      // Cleanup previews
      newEvent.imageFiles.forEach(f => URL.revokeObjectURL(f.preview));
      
      setNewEvent({
        clubName: "AIMSA",
        eventType: "Workshop",
        dateTime: "",
        venue: "",
        description: "",
        guestSpeaker: "",
        imageFiles: [],
      });
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding event.");
      console.error(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: true,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Club Events
          </h1>
        </div>

        {/* Add Event Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm text-gray-700 pl-1">Club Name</label>
              <select
                name="clubName"
                value={newEvent.clubName}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                {clubOptions.map(club => <option key={club} value={club} className="bg-white">{club}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 pl-1">Event Type</label>
              <select
                name="eventType"
                value={newEvent.eventType}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                {eventTypes.map(type => <option key={type} value={type} className="bg-white">{type}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 pl-1">Date & Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={newEvent.dateTime}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700 pl-1">Venue</label>
              <input
                type="text"
                name="venue"
                value={newEvent.venue}
                onChange={handleInputChange}
                placeholder="e.g. Main Auditorium"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-700 pl-1">Guest Speaker (Optional)</label>
              <input
                type="text"
                name="guestSpeaker"
                value={newEvent.guestSpeaker}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-700 pl-1">Description</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Event details..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50 min-h-[100px]"
              />
            </div>

            {/* Dropzone */}
            <div className="md:col-span-2 space-y-4">
              <div 
                {...getRootProps()} 
                className={`w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragActive ? "border-pink-500 bg-pink-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <input {...getInputProps()} />
                <CloudUpload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-slate-700 font-medium">Drag & drop event posters here</p>
                <p className="text-gray-500 text-sm mt-1">or click to browse files</p>
              </div>

              {/* Image Previews */}
              {newEvent.imageFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {newEvent.imageFiles.map((file, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden aspect-video bg-black/50">
                      <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-6 h-6" /> Create Event
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events List */}
        <div>
          {loading ? (
             <div className="text-center text-gray-400 py-10 animate-pulse">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-2xl">
              No events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {events.map((event) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden group hover:border-pink-500 hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      {event.images?.length > 0 ? (
                        <img 
                          src={event.images[0]} 
                          alt="Event" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-gray-700" />
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-pink-600 shadow-sm">
                        {event.clubName}
                      </div>

                      {role === "superadmin" && (
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-md text-white rounded-xl hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{event.eventType}</h3>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-slate-600 text-sm gap-3">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          <span>{convertToIST(event.dateTime)}</span>
                        </div>
                        <div className="flex items-center text-slate-600 text-sm gap-3">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>
                        {event.guestSpeaker && (
                          <div className="flex items-center text-slate-600 text-sm gap-3">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span className="line-clamp-1">{event.guestSpeaker}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto">
                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubEvents;
