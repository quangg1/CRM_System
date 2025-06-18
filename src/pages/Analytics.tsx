import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Container } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { customerService } from '../services/customerService';
import { interactionService } from '../services/interactionService';

interface ChartData {
  name: string;
  value: number;
}

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [customerData, setCustomerData] = useState<ChartData[]>([]);
  const [interactionData, setInteractionData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customerStats, interactionStats] = await Promise.all([
          customerService.getStats(),
          interactionService.getStats()
        ]);

        setStats({
          ...customerStats,
          ...interactionStats
        });

        // Prepare customer distribution data
        setCustomerData([
          { name: 'Leads', value: customerStats.leads },
          { name: 'Customers', value: customerStats.customers },
          { name: 'Inactive', value: customerStats.inactive }
        ]);

        // Prepare interaction status data
        setInteractionData([
          { name: 'Scheduled', value: interactionStats.scheduled },
          { name: 'Completed', value: interactionStats.completed },
          { name: 'Cancelled', value: interactionStats.cancelled }
        ]);

        setError(null);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate max values for Y-axis domains
  const maxCustomerValue = Math.max(...customerData.map(item => item.value));
  const maxInteractionValue = Math.max(...interactionData.map(item => item.value));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        pt: 8,
        px: 3,
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Detailed Analytics
        </Typography>

        {/* Charts */}
        <Box display="grid" gridTemplateColumns="1fr" gap={4}>
          {/* Customer Distribution Chart */}
          <Paper elevation={3} sx={{ p: 3, height: '800px' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Customer Distribution Analysis
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={customerData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 20 }}
                  label={{ 
                    value: 'Customer Status', 
                    position: 'bottom', 
                    offset: 30,
                    style: { fontSize: 20 }
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 20 }}
                  domain={[0, Math.ceil(maxCustomerValue * 1.1)]}
                  allowDecimals={false}
                  label={{ 
                    value: 'Number of Customers', 
                    angle: -90, 
                    position: 'left',
                    style: { fontSize: 20 }
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '16px' }} />
                <Bar dataKey="value" fill="#8884d8" barSize={100} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Interaction Status Chart */}
          <Paper elevation={3} sx={{ p: 3, height: '800px' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Interaction Status Analysis
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={interactionData} margin={{ top: 20, right: 30, left: 50, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 20 }}
                  label={{ 
                    value: 'Interaction Status', 
                    position: 'bottom', 
                    offset: 30,
                    style: { fontSize: 20 }
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 20 }}
                  domain={[0, Math.ceil(maxInteractionValue * 1.1)]}
                  allowDecimals={false}
                  label={{ 
                    value: 'Number of Interactions', 
                    angle: -90, 
                    position: 'left',
                    style: { fontSize: 20 }
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '16px' }} />
                <Bar dataKey="value" fill="#82ca9d" barSize={100} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Analytics; 