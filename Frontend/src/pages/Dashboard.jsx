import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { 
  Container, Tabs, Tab, Box, Typography, Button, CircularProgress, useTheme 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Lazy-loaded components (Performance Optimization)
const Announcements = lazy(() => import("../Components/Dashboard/Announcements"));
const Notices = lazy(() => import("../Components/Dashboard/Notices"));
const ClubEvents = lazy(() => import("../Components/Dashboard/ClubEvents"));
const Member = lazy(() => import("../Components/Dashboard/Member"));
const AuditLogs = lazy(() => import("../Components/Dashboard/Audit"));
const TimetableManager = lazy(() => import("../Components/Dashboard/Timetable"));
const PlacedStudent = lazy(() => import("../Components/Dashboard/PlacedStudent"));
const Result = lazy(() => import("../Components/Dashboard/Result"));
const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // State Management
  const [tabIndex, setTabIndex] = useState(Number(localStorage.getItem("tabIndex")) || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);
  
  
  // Logout Handler (Optimized with useCallback)
  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Already logged out.");

      await axios.post("/api/admin/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token"); // Clear token
      setRole(null); // Clear role state
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <Container sx={{ py: 4 }}>
      {/* Header Section */}
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

      {/* Error Display */}
      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      {/* Dashboard Description */}
      <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 3 }}>
        Manage announcements, notices, club events, placed student and audit logs
      </Typography>

      {/* Tabs Navigation */}
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
        sx={{ borderBottom: 1, borderColor: theme.palette.divider }}
      >
        <Tab label="Announcements" />
        <Tab label="Notices" />
        <Tab label="Club Events" />
        <Tab label="Member" />
        <Tab label="Audit Logs" />
        <Tab label="Timetable" />
        <Tab label="PlacedStudent" />
        <Tab label="Result" />
      </Tabs>

      {/* Content Based on Tab Selection */}
      <Box sx={{ mt: 3, p: 2 }}>
        <Suspense fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}>
          {tabIndex === 0 && <Announcements />}
          {tabIndex === 1 && <Notices />}
          {tabIndex === 2 && <ClubEvents />}
          {tabIndex === 3 && <Member />}
          {tabIndex === 4 && <AuditLogs />}
          {tabIndex === 5 && <TimetableManager />}
          {tabIndex === 6 && <PlacedStudent />}
          {tabIndex === 7 && <Result />}

        </Suspense>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
