import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/analysis/stats")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold">Event Analytics</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Total Events */}
          <Typography variant="h6" mt={2}>Total Events: {data?.totalEvents || 0}</Typography>

          <Grid container spacing={2} mt={2}>
            {/* Club-wise Events */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Club-wise Events</Typography>
                  {Array.isArray(data?.clubWiseEvents) && data.clubWiseEvents.length > 0 ? (
                    data.clubWiseEvents.map((club) => (
                      <Typography key={club._id}>
                        {club._id}: {club.count}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No club-wise data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Event Type Distribution */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Event Type Distribution</Typography>
                  {Array.isArray(data?.eventTypeDistribution) && data.eventTypeDistribution.length > 0 ? (
                    data.eventTypeDistribution.map((eventType) => (
                      <Typography key={eventType._id}>
                        {eventType._id}: {eventType.count}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No event type data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Monthly Events */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Monthly Events</Typography>
                  {Array.isArray(data?.monthlyEvents) && data.monthlyEvents.length > 0 ? (
                    data.monthlyEvents.map((month) => (
                      <Typography key={month._id}>
                        Month {month._id}: {month.count} events
                      </Typography>
                    ))
                  ) : (
                    <Typography>No monthly data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Analytics;
