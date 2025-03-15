import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get("/api/admin/audit-logs");
        setLogs(response.data.logs);
      } catch (err) {
        toast.error("Failed to load audit logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto" }} />;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Audit Logs</Typography>
      <List>
        {logs.map((log, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={log.action} secondary={`By: ${log.admin} | At: ${new Date(log.timestamp).toLocaleString()}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AuditLogs;
