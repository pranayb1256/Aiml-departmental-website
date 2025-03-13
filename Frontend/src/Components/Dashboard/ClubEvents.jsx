import { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField, Button, Card, CardContent, Typography, Grid, Box, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/events";

const ClubEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newEvent, setNewEvent] = useState(initialEventState());
    const [editEvent, setEditEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    function initialEventState() {
        return { title: "", eventDate: "", description: "", guestSpeaker: "", venue: "", learnings: "", imageFile: null };
    }

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        setNewEvent({ ...newEvent, imageFile: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.entries(newEvent).forEach(([key, value]) => formData.append(key, value));

        try {
            const res = await axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
            setEvents([...events, res.data]);
            setNewEvent(initialEventState()); // Reset form
        } catch (err) {
            console.error("Error adding event:", err);
        } finally {
            toast.success("Added new club event successfully!")
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setEvents(events.filter(event => event._id !== id));
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const openEditDialog = (event) => {
        setEditEvent(event);
        setOpenDialog(true);
    };

    const handleEditChange = (e) => {
        setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_URL}/${editEvent._id}`, editEvent);
            fetchEvents();
            setOpenDialog(false);
        } catch (err) {
            console.error("Error updating event:", err);
        }
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Manage Club Events
            </Typography>

            {/* Add Event Form */}
            <Grid container spacing={2}>
                {["title", "eventDate", "venue", "description", "guestSpeaker", "learnings"].map((field, index) => (
                    <Grid item xs={field === "description" ? 12 : 6} key={index}>
                        <TextField
                            label={field.replace(/([A-Z])/g, " $1").trim()}
                            name={field}
                            fullWidth
                            type={field === "eventDate" ? "date" : "text"}
                            value={newEvent[field]}
                            onChange={handleInputChange}
                            multiline={field === "description"}
                            rows={field === "description" ? 3 : 1}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} fullWidth sx={{ backgroundColor: "#1976D2", color: "white" }}>
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
                        Add Event
                    </Button>
                </Grid>
            </Grid>

            {/* Loading State */}
            {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />}

            {/* Display Events */}
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {events.map((event) => (
                    <Grid item xs={12} md={6} key={event._id}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <img src={event.images} alt={event.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>{event.title}</Typography>
                                <Typography sx={{ color: "gray" }}>{event.eventDate}</Typography>
                                <Typography sx={{ mt: 1 }}>{event.description}</Typography>
                                <Typography sx={{ fontWeight: "bold" }}>🎤 {event.guestSpeaker}</Typography>
                                <Typography>📍 {event.venue}</Typography>
                                <Typography>📚 {event.learnings}</Typography>

                                {/* Edit & Delete Buttons */}
                                <Button startIcon={<EditIcon />} color="primary" onClick={() => openEditDialog(event)} sx={{ mt: 2, mr: 1 }}>
                                    Edit
                                </Button>
                                <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(event._id)} sx={{ mt: 2 }}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Event Dialog */}
            {editEvent && (
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogContent>
                        {["title", "eventDate", "venue", "description", "guestSpeaker", "learnings"].map((field, index) => (
                            <TextField
                                key={index}
                                label={field.replace(/([A-Z])/g, " $1").trim()}
                                name={field}
                                fullWidth
                                type={field === "eventDate" ? "date" : "text"}
                                value={editEvent[field]}
                                onChange={handleEditChange}
                                multiline={field === "description"}
                                rows={field === "description" ? 3 : 1}
                                sx={{ mt: 2 }}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleUpdate} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ClubEvents;
