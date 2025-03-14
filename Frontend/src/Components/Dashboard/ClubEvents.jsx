import { useState, useEffect } from "react";
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
  Select, MenuItem, InputLabel, FormControl
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast from "react-hot-toast";

const API_URL = "/api/events/";
const clubOptions = ["AIMSA", "CSI", "ISTCE"];

const initialEventState = {
  clubName: "",
  date: null,
  venue: "",
  description: "",
  guestSpeaker: "",
  imageFiles: [],
};

const ClubEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState(initialEventState);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewEvent((prev) => ({ ...prev, date }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewEvent((prev) => ({ ...prev, imageFiles: files }));
  };

  const handleSubmit = async () => {
    if (!newEvent.clubName || !newEvent.date || !newEvent.venue || !newEvent.description) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(newEvent).forEach(([key, value]) => {
      if (key !== "imageFiles") {
        formData.append(key, value);
      }
    });
    newEvent.imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEvents();
      toast.success("Event added successfully!");
      setNewEvent(initialEventState);
    } catch (err) {
      toast.error("Failed to add event.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEvents();
      toast.success("Event deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete event.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: "900px", margin: "auto", p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Manage Club Events
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Club Name</InputLabel>
              <Select name="clubName" value={newEvent.clubName} onChange={handleInputChange}>
                {clubOptions.map((club) => (
                  <MenuItem key={club} value={club}>
                    {club}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {["venue", "description", "guestSpeaker"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                fullWidth
                value={newEvent[field]}
                onChange={handleInputChange}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <DatePicker
              label="Event Date"
              value={newEvent.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
              Upload Images
              <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Add Event
            </Button>
          </Grid>
        </Grid>

        {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.03)" } }}>
                {event.images?.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.images[0]}
                    alt="Event Image"
                    sx={{ objectFit: "cover", width: "100%", borderRadius: "8px" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{event.clubName}</Typography>
                  <Typography>Date: {event.date || "N/A"}</Typography>
                  <Typography>Venue: {event.venue}</Typography>
                  <Typography>Description: {event.description}</Typography>
                  <Typography>Guest Speaker: {event.guestSpeaker || "TBA"}</Typography>
                  <IconButton onClick={() => handleDelete(event._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  )
};

export default ClubEvents;