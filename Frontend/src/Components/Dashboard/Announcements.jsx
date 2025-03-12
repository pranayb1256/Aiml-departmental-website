import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/announcements")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  const addAnnouncement = () => {
    axios.post("http://localhost:5000/api/announcements", newAnnouncement)
      .then(res => setAnnouncements([...announcements, res.data]))
      .catch(err => console.error(err));
  };

  const deleteAnnouncement = (id) => {
    axios.delete(`http://localhost:5000/api/announcements/${id}`)
      .then(() => setAnnouncements(announcements.filter(a => a._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Typography variant="h5">Manage Announcements</Typography>

      <TextField label="Title" fullWidth value={newAnnouncement.title} 
        onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
      <TextField label="Description" fullWidth value={newAnnouncement.description} 
        onChange={e => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={addAnnouncement}>Add Announcement</Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {announcements.map((ann) => (
          <Grid item xs={12} md={6} key={ann._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ann.title}</Typography>
                <Typography>{ann.description}</Typography>
                <Button variant="outlined" color="error" onClick={() => deleteAnnouncement(ann._id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Announcements;
