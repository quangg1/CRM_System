import React from 'react';
import { Box, Container } from '@mui/material';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivities from '../components/Dashboard/RecentActivities';
import { People, TrendingUp, AttachMoney } from '@mui/icons-material';

const Dashboard: React.FC = () => {
    const initialStats = [
        {
            title: 'Total Customers',
            value: '0',
            icon: <People />,
            color: '#1976d2',
        },
        {
            title: 'Active Leads',
            value: '0',
            icon: <TrendingUp />,
            color: '#2e7d32',
        },
        {
            title: 'Revenue',
            value: '$0',
            icon: <AttachMoney />,
            color: '#ed6c02',
        },
    ];

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
                <DashboardStats stats={initialStats} />
                <RecentActivities activities={[]} />
            </Container>
        </Box>
    );
};

export default Dashboard; 