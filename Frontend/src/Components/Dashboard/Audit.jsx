import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/audit-logs")
      .then((res) => setLogs(res.data.logs))
      .catch((err) => console.error("Error fetching logs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">Audit Logs</Typography>
      {loading ? <CircularProgress /> : (
        logs.map((log, index) => (
          <Typography key={index}>
            {log.admin?.name} ({log.admin?.email}) - {log.action} - {new Date(log.timestamp).toLocaleString()}
          </Typography>
        ))
      )}
    </Box>
  );
};

export default AuditLogs;
