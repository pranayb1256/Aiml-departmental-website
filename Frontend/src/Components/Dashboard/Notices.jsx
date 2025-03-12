import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("/api/admin/notices")
      .then(res => {
        console.log("Fetched notices:", res.data); // Debugging
        setNotices(Array.isArray(res.data) ? res.data : res.data.notices || []);
      })
      .catch(err => console.error("Error fetching notices:", err));
  }, []);

  const addNotice = () => {
    axios.post("/api/admin/notices", newNotice)
      .then(res => setNotices([...notices, res.data]))
      .catch(err => console.error("Error adding notice:", err));
  };

  return (
    <div>
      <Typography variant="h5">Manage Notices</Typography>

      <TextField label="Title" fullWidth value={newNotice.text} 
        onChange={e => setNewNotice({ ...newNotice, text: e.target.value })} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={addNotice}>Add Notice</Button>

      {notices.length === 0 ? (
        <Typography sx={{ mt: 2, color: "gray" }}>No notices available.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {notices.map((notice) => (
            <Grid item xs={12} key={notice._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{notice.text}</Typography>
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
