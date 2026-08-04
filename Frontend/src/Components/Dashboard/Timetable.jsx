import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdUploadFile } from "react-icons/md";
import { Loader2, Calendar, Trash2, UploadCloud, FileText } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const AcademicCalendarManager = () => {
  const [year, setYear] = useState("FE");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState("");
  const [allCalendars, setAllCalendars] = useState([]);

  useEffect(() => {
    fetchAllCalendars();
  }, []);

  useEffect(() => {
    updateCalendarUrl();
  }, [year, allCalendars]);

  const fetchAllCalendars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setAllCalendars(res.data.calendars || []);
    } catch (error) {
      console.error("Error fetching calendars:", error);
      setAllCalendars([]);
    } finally {
      setLoading(false);
    }
  };

  const updateCalendarUrl = () => {
    const selected = allCalendars.find((cal) => cal.year === year);
    if (selected) {
      const embedUrl = selected.url.replace("/upload/", "/upload/fl_embed/");
      setCalendarUrl(embedUrl);
    } else {
      setCalendarUrl("");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file to upload");

    const formData = new FormData();
    formData.append("calendar-pdf", file);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/${year}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        fetchAllCalendars();
        alert("Calendar uploaded successfully!");
        setFile(null); // Reset file input
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (selectedYear) => {
    if (!confirm(`Are you sure you want to delete the calendar for ${selectedYear}?`)) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${selectedYear}`);
      fetchAllCalendars();
      alert("Calendar deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Academic Calendar Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Upload & Manage */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Upload Card */}
          <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-slate-400" />
              Upload Calendar
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Academic Year</label>
                <select 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
                >
                  {["FE", "SE", "TE", "BE"].map((y) => (
                    <option key={y} value={y}>{y} (Year)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">PDF File</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <MdUploadFile className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
                    {file ? (
                      <p className="text-sm font-medium text-blue-600 truncate w-full max-w-[200px]">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-slate-500 font-medium">Click to upload</p>
                        <p className="text-xs text-slate-400 mt-1">PDF (MAX. 10MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upload Calendar"}
              </button>
            </div>
          </div>

          {/* Manage Calendars Card */}
          <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              Existing Calendars
            </h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {allCalendars.length > 0 ? (
                allCalendars.map((cal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-gray-100 rounded-lg group hover:border-blue-200 transition-colors">
                    <span className="font-medium text-slate-700">Year {cal.year}</span>
                    <button
                      onClick={() => handleDelete(cal.year)}
                      disabled={loading}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete Calendar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No calendars found.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl h-full flex flex-col min-h-[500px]">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              Calendar Preview: {year}
            </h3>
            
            <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative">
              {loading && !calendarUrl ? (
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin absolute" />
              ) : calendarUrl ? (
                <iframe
                  src={calendarUrl}
                  className="w-full h-full min-h-[500px]"
                  title={`Academic Calendar ${year}`}
                ></iframe>
              ) : (
                <div className="text-center text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No calendar available for {year}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicCalendarManager;
