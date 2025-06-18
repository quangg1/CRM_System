import React, { useState, useEffect } from 'react';
import { Box, Container, Alert, CircularProgress } from '@mui/material';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivities from '../components/Dashboard/RecentActivities';
import { People, TrendingUp, AttachMoney, Schedule } from '@mui/icons-material';
import customerService, { CustomerStats } from '../services/customerService';
import interactionService, { InteractionStats, Interaction } from '../services/interactionService';

const Dashboard: React.FC = () => {
    const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);
    const [interactionStats, setInteractionStats] = useState<InteractionStats | null>(null);
    const [upcomingInteractions, setUpcomingInteractions] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch data in parallel
                const [customerStatsData, interactionStatsData, upcomingData] = await Promise.all([
                    customerService.getStats(),
                    interactionService.getStats(),
                    interactionService.getUpcoming()
                ]);

                setCustomerStats(customerStatsData);
                setInteractionStats(interactionStatsData);
                setUpcomingInteractions(upcomingData);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        {
            title: 'Total Customers',
            value: customerStats?.total?.toString() || '0',
            icon: <People />,
            color: '#1976d2',
        },
        {
            title: 'Active Leads',
            value: customerStats?.leads?.toString() || '0',
            icon: <TrendingUp />,
            color: '#2e7d32',
        },
        {
            title: 'Upcoming Interactions',
            value: upcomingInteractions.length.toString(),
            icon: <Schedule />,
            color: '#ed6c02',
        },
        {
            title: 'Completed Interactions',
            value: interactionStats?.completed?.toString() || '0',
            icon: <AttachMoney />,
            color: '#9c27b0',
        },
    ];

    if (loading) {
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <DashboardStats stats={stats} />
                <RecentActivities activities={upcomingInteractions} />
            </Container>
        </Box>
    );
};

export default Dashboard; 