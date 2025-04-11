import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { MdDelete, MdUploadFile } from "react-icons/md";

const API_URL = "/api/academic-calendar";

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
    <div className="p-6 max-w-xl mx-auto">
      <Typography variant="h4">Academic Calendar Management</Typography>

      <div className="flex gap-6 mb-4 mt-4">
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            {["FE", "SE", "TE", "BE"].map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <label className="block w-full border-2 border-dashed p-4 text-center cursor-pointer rounded-md">
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <MdUploadFile className="text-4xl mx-auto mb-2 text-gray-500" />
        {file ? file.name : "Click to select a PDF file"}
      </label>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
        className="mt-4"
      >
        Upload
      </Button>

      {loading ? (
        <CircularProgress className="mt-4" />
      ) : calendarUrl ? (
        <iframe
          src={calendarUrl}
          className="mt-4 w-full h-96"
          title="Academic Calendar"
        ></iframe>
      ) : (
        <Typography className="mt-4 text-gray-500">
          No calendar found.
        </Typography>
      )}

      <Typography variant="h5" className="mt-6">
        Previous Calendars
      </Typography>
      <div className="mt-2">
        {allCalendars.length > 0 ? (
          allCalendars.map((cal, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2"
            >
              <span>{`Year ${cal.year}`}</span>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(cal.year)}
              >
                <MdDelete className="mr-1" /> Delete
              </Button>
            </div>
          ))
        ) : (
          <Typography className="text-gray-500">
            No calendars found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendarManager;
