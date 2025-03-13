import { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box, Typography, Button, CircularProgress } from "@mui/material";
import Announcements from "../Components/Dashboard/Announcements";
import Notices from "../Components/Dashboard/Notices";
import ClubEvents from "../Components/Dashboard/ClubEvents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Load tab index from localStorage or default to 0
  const [tabIndex, setTabIndex] = useState(
    Number(localStorage.getItem("tabIndex")) || 0
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tabIndex", tabIndex); // Save tab index when changed
  }, [tabIndex]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      toast.success("Logged out successfullly!");

      await axios.post(
        "api/admin/logout", 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token"); // Clear token from localStorage
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome, Admin!
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout} 
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Logout"}
        </Button>
      </Box>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 3 }}>
        Manage announcements, notices, and club events.
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Announcements" />
        <Tab label="Notices" />
        <Tab label="Club Events" />
      </Tabs>

      <Box sx={{ mt: 3, p: 2 }}>
        {tabIndex === 0 && <Announcements />}
        {tabIndex === 1 && <Notices />}
        {tabIndex === 2 && <ClubEvents />}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
