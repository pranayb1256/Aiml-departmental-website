import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/admin/analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">Analytics</Typography>
      {loading ? <CircularProgress /> : (
        <>
          <Typography>Total Events: {data?.totalEvents}</Typography>
          {data?.clubWiseEvents.map((club) => (
            <Typography key={club._id}>
              {club._id}: {club.count}
            </Typography>
          ))}
        </>
      )}
    </Box>
  );
};

export default Analytics;
