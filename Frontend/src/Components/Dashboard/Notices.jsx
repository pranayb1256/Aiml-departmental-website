import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/notices")
      .then(res => setNotices(res.data))
      .catch(err => console.error(err));
  }, []);

  const addNotice = () => {
    axios.post("http://localhost:5000/api/notices", newNotice)
      .then(res => setNotices([...notices, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Typography variant="h5">Manage Notices</Typography>

      <TextField label="Title" fullWidth value={newNotice.title} 
        onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} />
      <TextField label="Content" fullWidth multiline rows={3} value={newNotice.content} 
        onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={addNotice}>Add Notice</Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {notices.map((notice) => (
          <Grid item xs={12} key={notice._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{notice.title}</Typography>
                <Typography>{notice.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notices;
