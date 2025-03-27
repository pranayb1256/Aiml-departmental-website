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

const API_URL = "/api/academics";

const TimetableManager = () => {
    const [year, setYear] = useState("FE");
    const [semester, setSemester] = useState("1");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timetableUrl, setTimetableUrl] = useState("");
    const [allTimetables, setAllTimetables] = useState([]);

    const semesterOptions = {
        FE: ["1", "2"],
        SE: ["3", "4"],
        TE: ["5", "6"],
        BE: ["7", "8"],
    };

    useEffect(() => {
        fetchAllTimetables();
    }, []);

    useEffect(() => {
        updateTimetableUrl();
    }, [year, semester, allTimetables]);

    const fetchAllTimetables = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setAllTimetables(res.data.timetables || []);
        } catch (error) {
            console.error("Error fetching timetables:", error);
            setAllTimetables([]);
        } finally {
            setLoading(false);
        }
    };

    const updateTimetableUrl = () => {
        const selectedTimetable = allTimetables.find(tt => tt.year === year && tt.semester === semester);
        if (selectedTimetable) {
            const embedUrl = selectedTimetable.url.replace("/upload/", "/upload/fl_embed/");
            setTimetableUrl(embedUrl);
        } else {
            setTimetableUrl("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("tt-pdf", file);

        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/${year}/${semester}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                fetchAllTimetables();
                alert("Timetable uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading timetable:", error);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (selectedYear, selectedSemester) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${selectedYear}/${selectedSemester}`);
            fetchAllTimetables();
            alert("Timetable deleted successfully!");
        } catch (error) {
            console.error("Error deleting timetable:", error);
            alert("Delete failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Typography variant="h4">Timetable Management</Typography>

            <div className="flex gap-6 mb-4">
                <FormControl fullWidth>
                    <InputLabel>Year</InputLabel>
                    <Select value={year} onChange={(e) => setYear(e.target.value)}>
                        {Object.keys(semesterOptions).map((y) => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Semester</InputLabel>
                    <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
                        {semesterOptions[year].map((sem) => (
                            <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <label className="block w-full border-2 border-dashed p-4 text-center cursor-pointer rounded-md">
                <input type="file" hidden accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                <MdUploadFile className="text-4xl mx-auto mb-2 text-gray-500" />
                {file ? file.name : "Click to select a PDF file"}
            </label>

            <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading} className="mt-4">
                Upload
            </Button>

            {loading ? (
                <CircularProgress className="mt-4" />
            ) : timetableUrl ? (
                <iframe src={timetableUrl} className="mt-4 w-full h-96" title="Timetable"></iframe>
            ) : (
                <Typography className="mt-4 text-gray-500">No timetable found.</Typography>
            )}

            <Typography variant="h5" className="mt-6">Previous Timetables</Typography>
            <div className="mt-2">
                {allTimetables.length > 0 ? (
                    allTimetables.map((tt, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
                            <span>{`Year ${tt.year} - Semester ${tt.semester}`}</span>
                            <Button variant="contained" color="error" size="small" onClick={() => handleDelete(tt.year, tt.semester)}>
                                <MdDelete className="mr-1" /> Delete
                            </Button>
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
