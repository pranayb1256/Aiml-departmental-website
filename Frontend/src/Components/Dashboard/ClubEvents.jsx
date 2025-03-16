import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CircularProgress,
    CardMedia,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const API_URL = "/api/events/";
const clubOptions = ["AIMSA", "CSI", "ISTCE"];

const convertToIST = (date) => dayjs.utc(date).tz("Asia/Kolkata").format("DD/MM/YYYY hh:mm A");

const ClubEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newEvent, setNewEvent] = useState({ clubName: "", dateTime: null, venue: "", description: "", guestSpeaker: "", imageFiles: [] });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setEvents(res.data.events || []);
        } catch (err) {
            toast.error("Failed to fetch events.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await axios.delete(`${API_URL}${eventId}`);
            toast.success("Event deleted successfully!");
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        } catch (err) {
            toast.error("Failed to delete event.");
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateTimeChange = (dateTime) => {
        setNewEvent((prev) => ({ ...prev, dateTime: dayjs(dateTime).tz("Asia/Kolkata").toISOString() }));
    };

    const onDrop = useCallback((acceptedFiles) => {
        setNewEvent((prev) => ({
            ...prev,
            imageFiles: [...prev.imageFiles, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))],
        }));
    }, []);

    const removeImage = (index) => {
        setNewEvent((prev) => ({
            ...prev,
            imageFiles: prev.imageFiles.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        if (!newEvent.clubName || !newEvent.dateTime || !newEvent.venue || !newEvent.description) {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            const response = await axios.post("/api/events/", { newEvent });
            console.log("hri ", newEvent);

            // Update state with the new event
            setNewEvent((prevEvents) => [...prevEvents, response.data.newEvent]);

            // Clear the input fields after successful submission
            setNewEvent({ clubName: "", dateTime: null, venue: "", description: "", guestSpeaker: "", imageFiles: [] });
            toast.success("Event added successfully!");

        } catch (error) {

            console.error("Error adding event:", error);
            toast.error("Something went wrong. Please try again later.");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ maxWidth: "800px", margin: "auto", p: 4, bgcolor: "#ffffff", borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Manage Club Events
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Club Name</InputLabel>
                            <Select name="clubName" value={newEvent.clubName} onChange={handleInputChange}>
                                {clubOptions.map((club) => (
                                    <MenuItem key={club} value={club}>{club}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {["venue", "description", "guestSpeaker"].map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField label={field.charAt(0).toUpperCase() + field.slice(1)} name={field} fullWidth value={newEvent[field]} onChange={handleInputChange} />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <DateTimePicker label="Event Date & Time" value={newEvent.dateTime ? dayjs(newEvent.dateTime).tz("Asia/Kolkata") : null} onChange={handleDateTimeChange} renderInput={(params) => <TextField fullWidth {...params} />} />
                    </Grid>

                    {/* Drag and Drop Upload Section */}
                    <Grid item xs={12}>
                        <Box {...getRootProps()} sx={{ p: 3, border: "2px dashed #aaa", borderRadius: 2, textAlign: "center", cursor: "pointer", bgcolor: isDragActive ? "#f0f0f0" : "transparent" }}>
                            <input {...getInputProps()} />
                            <CloudUploadIcon sx={{ fontSize: 40, color: "#666" }} />
                            <Typography>{isDragActive ? "Drop the files here..." : "Drag & drop images here, or click to select"}</Typography>
                        </Box>
                    </Grid>

                    {/* Image Preview Section */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {newEvent.imageFiles.map((file, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box position="relative">
                                        <CardMedia component="img" height="100" image={file.preview} alt="Uploaded" sx={{ borderRadius: 1 }} />
                                        <IconButton sx={{ position: "absolute", top: 0, right: 0, color: "red" }} onClick={() => removeImage(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSubmit} fullWidth>
                            Add Event
                        </Button>
                    </Grid>
                </Grid>

                {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

                {/* Display Events */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event._id}>
                            <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)" }, boxShadow: 3 }}>
                                {event.images?.length > 0 && <CardMedia component="img" height="200" image={event.images[0]} alt="Event" />}
                                <CardContent>
                                    <Typography variant="h6">{event.clubName}</Typography>
                                    <Typography>Date & Time: {convertToIST(event.dateTime)}</Typography>
                                    <Typography>Venue: {event.venue}</Typography>
                                    <Typography>Description: {event.description.slice(0, 50)}...</Typography>
                                    <IconButton color="error" onClick={() => handleDelete(event._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};

export default ClubEvents;
