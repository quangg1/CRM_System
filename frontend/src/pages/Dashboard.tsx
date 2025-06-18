import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Container } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { People, TrendingUp, Event, CheckCircle } from '@mui/icons-material';
import { customerService } from '../services/customerService';
import { interactionService } from '../services/interactionService';

interface ChartData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
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
        setError('Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          Analytics Dashboard
        </Typography>

        {/* Stats Cards */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={3} mb={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <People color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" color="textSecondary">Total Customers</Typography>
              <Typography variant="h4">{stats?.total || 0}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TrendingUp color="success" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" color="textSecondary">Active Leads</Typography>
              <Typography variant="h4">{stats?.leads || 0}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Event color="warning" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" color="textSecondary">Upcoming Interactions</Typography>
              <Typography variant="h4">{stats?.scheduled || 0}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckCircle color="info" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" color="textSecondary">Completed Interactions</Typography>
              <Typography variant="h4">{stats?.completed || 0}</Typography>
            </Box>
          </Paper>
        </Box>

        {/* Charts */}
        <Box display="grid" gridTemplateColumns="1fr" gap={4}>
          {/* Customer Distribution Chart */}
          <Paper elevation={3} sx={{ p: 3, height: '1000px' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Customer Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={customerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 20 }} />
                <YAxis tick={{ fontSize: 20 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" barSize={100} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Interaction Status Chart */}
          <Paper elevation={3} sx={{ p: 3, height: '1000px' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Interaction Status
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={interactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 20 }} />
                <YAxis tick={{ fontSize: 20 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" barSize={100} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 