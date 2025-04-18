import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import { toast } from "react-hot-toast";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");
  const [editingNotice, setEditingNotice] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch Notices
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/admin/notices`)
      .then((res) => {
        console.log("Fetched notices:", res.data);
        setNotices(Array.isArray(res.data.notices) ? res.data.notices : []);
      })
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  // Add Notice
  const addNotice = () => {
    if (!newNotice.trim()) return; // Prevent empty notices
    const apiUrl = import.meta.env.VITE_API_URL;

    axios
      .post(`${apiUrl}/admin/notices`, { text: newNotice.trim() })
      .then((res) => {
        toast.success("Added new Notice successfully!");
        setNotices([res.data.notice, ...notices]); // Add new notice at the top
        setNewNotice(""); // Reset input field
      })
      .catch((err) => console.error("Error adding notice:", err));
  };

  // Delete Notice
  const deleteNotice = (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .delete(`${apiUrl}/admin/notices/${id}`)
      .then(() => setNotices(notices.filter((notice) => notice._id !== id)))
      .catch((err) => console.error("Error deleting notice:", err));
  };

  // Start Editing
  const startEditing = (notice) => {
    setEditingNotice(notice._id);
    setEditText(notice.text);
  };

  // Update Notice
  const updateNotice = (id) => {
    if (!editText.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .put(`${apiUrl}/admin/notices/${id}`, { text: editText.trim() })
      .then((res) => {
        setNotices(notices.map((n) => (n._id === id ? res.data.notice : n)));
        setEditingNotice(null); // Reset edit mode
      })
      .catch((err) => console.error("Error updating notice:", err));
  };

  return (
    <div>
      <Typography variant="h5">Manage Notices</Typography>

      {/* Notice Input Field */}
      <TextField
        label="Notice"
        fullWidth
        value={newNotice}
        onChange={(e) => setNewNotice(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={addNotice} disabled={!newNotice.trim()}>
        Add Notice
      </Button>

      {/* Display Notices */}
      {notices.length === 0 ? (
        <Typography sx={{ mt: 2, color: "gray" }}>No notices available.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {notices.map((notice) => (
            <Grid item xs={12} key={notice._id}>
              <Card>
                <CardContent>
                  {editingNotice === notice._id ? (
                    <TextField
                      fullWidth
                      multiline
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography variant="h6">{notice.text}</Typography>
                  )}

                  <div style={{ marginTop: "10px" }}>
                    {editingNotice === notice._id ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateNotice(notice._id)}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => startEditing(notice)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteNotice(notice._id)}
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

export default Notices;
