import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress } from "@mui/material";
import { MdDelete, MdUploadFile } from "react-icons/md";

const API_URL = "/api/academics";

const TimetableManager = () => {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timetableUrl, setTimetableUrl] = useState("");
  const [allTimetables, setAllTimetables] = useState([]);

  useEffect(() => {
    fetchAllTimetables();
  }, []);

  useEffect(() => {
    if (year && semester) {
      fetchTimetable();
    }
  }, [year, semester]);

  // Fetch all timetables
  const fetchAllTimetables = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setAllTimetables(res.data.timetables);
    } catch (error) {
      setAllTimetables([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific timetable
  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/${year}/${semester}`);
      setTimetableUrl(res.data.url);
    } catch (error) {
      setTimetableUrl("");
    } finally {
      setLoading(false);
    }
  };

  // Upload a new timetable
  const handleUpload = async () => {
    if (!file || !year || !semester) {
      alert("Please select a file, year, and semester.");
      return;
    }

    const formData = new FormData();
    formData.append("tt-pdf", file); // Ensure the field name matches multer config

    try {
      setLoading(true);
      await axios.post(`${API_URL}/${year}/${semester}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchTimetable();
      fetchAllTimetables(); // Refresh list
      alert("Timetable uploaded successfully!");
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a selected timetable
  const handleDelete = async (selectedYear, selectedSemester) => {
    if (!selectedYear || !selectedSemester) {
      alert("Please select a timetable to delete.");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${selectedYear}/${selectedSemester}`);
      fetchAllTimetables(); // Refresh list
      if (year === selectedYear && semester === selectedSemester) {
        setTimetableUrl(""); // Clear the display if the deleted timetable was being viewed
      }
      alert("Timetable deleted successfully!");
    } catch (error) {
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Typography variant="h4" className="mb-4">
        Timetable Management
      </Typography>

      {/* Year & Semester Selection */}
      <div className="flex gap-4 mb-4">
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Semester</InputLabel>
          <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <MenuItem value="1">Semester 1</MenuItem>
            <MenuItem value="2">Semester 2</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* File Upload */}
      <label className="block w-full border-2 border-dashed p-4 text-center cursor-pointer rounded-md">
        <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        <MdUploadFile className="text-4xl mx-auto mb-2 text-gray-500" />
        {file ? file.name : "Click to select a file"}
      </label>

      {/* Upload Button */}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading} className="mt-4">
        Upload
      </Button>

      {/* Show Timetable */}
      {loading ? (
        <CircularProgress className="mt-4" />
      ) : timetableUrl ? (
        <iframe src={timetableUrl} className="mt-4 w-full h-96" title="Timetable"></iframe>
      ) : (
        <Typography className="mt-4 text-gray-500">No timetable found.</Typography>
      )}

      {/* Previous Timetables List */}
      <Typography variant="h5" className="mt-6">Previous Timetables</Typography>
      <div className="mt-2">
        {allTimetables.length > 0 ? (
          allTimetables.map((tt, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
              <span>{`Year ${tt.year} - Semester ${tt.semester}`}</span>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(tt.year, tt.semester)}
                >
                  <MdDelete className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Typography className="text-gray-500">No timetables found.</Typography>
        )}
      </div>
    </div>
  );
};

export default TimetableManager;
