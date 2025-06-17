import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { People, TrendingUp, AttachMoney } from '@mui/icons-material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

interface DashboardStatsProps {
    stats: StatCardProps[];
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            bgcolor: color,
            color: 'white',
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h6" gutterBottom>
                {title}
            </Typography>
            {icon}
        </Box>
        <Typography component="p" variant="h4">
            {value}
        </Typography>
    </Paper>
);

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
    return (
        <Box sx={{ display: 'flex', gap: 3 }}>
            {stats.map((stat) => (
                <Box key={stat.title} sx={{ flex: 1 }}>
                    <StatCard {...stat} />
                </Box>
            ))}
        </Box>
    );
};

export default DashboardStats; 