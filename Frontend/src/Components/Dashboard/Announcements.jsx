import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { toast } from "react-hot-toast";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/admin/announcements`)
      .then((res) => {
        console.log("Fetched data:", res.data);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.announcements || [];
        setAnnouncements(data);
      })
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  const addAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;

    axios
      .post(`${apiUrl}/admin/announcements`, { text: newAnnouncement })
      .then((res) => {
        toast.success("Added new announcement successfully!");
        setAnnouncements((prev) => [...prev, res.data.announcement]);
        setNewAnnouncement("");
      })
      .catch((err) => console.error("Error adding announcement:", err));
  };

  const deleteAnnouncement = (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .delete(`${apiUrl}/admin/announcements/${id}`)
      .then(() => setAnnouncements((prev) => prev.filter((a) => a._id !== id)))
      .catch((err) => console.error("Error deleting announcement:", err));
  };

  const startEditing = (announcement) => {
    setEditingAnnouncement(announcement._id);
    setEditText(announcement.text);
  };

  const updateAnnouncement = (id) => {
    if (!editText.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .put(`${apiUrl}/admin/announcements/${id}`, { text: editText })
      .then((res) => {
        setAnnouncements((prev) =>
          prev.map((a) => (a._id === id ? { ...a, text: editText } : a))
        );
        setEditingAnnouncement(null);
        setEditText("");
      })
      .catch((err) => console.error("Error updating announcement:", err));
  };

  return (
    <div>
      <Typography variant="h5">Manage Announcements</Typography>

      {/* Notice Input Field */}
      <TextField
        label="Announcement"
        fullWidth
        value={newAnnouncement}
        onChange={(e) => setNewAnnouncement(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => addAnnouncement()}
        disabled={!newAnnouncement.trim()}
      >
        Add Announcement
      </Button>

      {/* Display Announcements */}
      {announcements.length === 0 ? (
        <Typography sx={{ mt: 2, color: "gray" }}>
          No announcements available.
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {announcements.map((ann) => (
            <Grid item xs={12} key={ann._id}>
              <Card>
                <CardContent>
                  {editingAnnouncement === ann._id ? (
                    <TextField
                      fullWidth
                      multiline
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography variant="h6">{ann.text}</Typography>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    {editingAnnouncement === ann._id ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateAnnouncement(ann._id)}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => startEditing(ann)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteAnnouncement(ann._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Announcements;
