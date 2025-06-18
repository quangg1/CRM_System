import React, { useState, useEffect } from 'react';
import { Box, Container, Alert, CircularProgress, Paper, Typography, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import { People, TrendingUp, AttachMoney, Schedule, BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material';
import customerService, { CustomerStats } from '../services/customerService';
import interactionService, { InteractionStats, Interaction } from '../services/interactionService';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface ChartData {
    name: string;
    value: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard: React.FC = () => {
    const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);
    const [interactionStats, setInteractionStats] = useState<InteractionStats | null>(null);
    const [upcomingInteractions, setUpcomingInteractions] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState<ChartData[]>([]);
    const [interactionData, setInteractionData] = useState<ChartData[]>([]);
    const [customerChartType, setCustomerChartType] = useState<"bar" | "pie">("bar");
    const [interactionChartType, setInteractionChartType] = useState<"bar" | "pie">("bar");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [customerStats, interactionStats] = await Promise.all([
                    customerService.getStats(),
                    interactionService.getStats(),
                ]);

                console.log('Raw Customer Stats:', customerStats);
                console.log('Raw Interaction Stats:', interactionStats);

                // Ensure minimum values of 1 for each category
                const customerData = [
                    { name: "Leads", value: Math.max(customerStats.leads || 0, 1) },
                    { name: "Customers", value: Math.max(customerStats.customers || 0, 1) },
                    { name: "Inactive", value: Math.max(customerStats.inactive || 0, 1) },
                ];

                const interactionData = [
                    { name: "Scheduled", value: Math.max(interactionStats.scheduled || 0, 1) },
                    { name: "Completed", value: Math.max(interactionStats.completed || 0, 1) },
                    { name: "Cancelled", value: Math.max(interactionStats.cancelled || 0, 1) },
                ];

                console.log('Processed Customer Data:', customerData);
                console.log('Processed Interaction Data:', interactionData);

                setCustomerData(customerData);
                setInteractionData(interactionData);

                setCustomerStats(customerStats);
                setInteractionStats(interactionStats);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCustomerChartTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newChartType: "bar" | "pie"
    ) => {
        if (newChartType !== null) {
            setCustomerChartType(newChartType);
        }
    };

    const handleInteractionChartTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newChartType: "bar" | "pie"
    ) => {
        if (newChartType !== null) {
            setInteractionChartType(newChartType);
        }
    };

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

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    const maxCustomerValue = Math.max(...customerData.map(item => item.value));
    const maxInteractionValue = Math.max(...interactionData.map(item => item.value));

    const renderCustomerChart = () => (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">
                    Customer Distribution
                </Typography>
                <ToggleButtonGroup
                    value={customerChartType}
                    exclusive
                    onChange={handleCustomerChartTypeChange}
                    aria-label="customer chart type"
                    size="small"
                    sx={{ 
                        backgroundColor: 'white',
                        '& .MuiToggleButton-root': {
                            px: 2,
                            py: 1,
                            '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            },
                        },
                    }}
                >
                    <ToggleButton value="bar" aria-label="bar chart">
                        <BarChartIcon sx={{ mr: 1 }} />
                        Bar
                    </ToggleButton>
                    <ToggleButton value="pie" aria-label="pie chart">
                        <PieChartIcon sx={{ mr: 1 }} />
                        Pie
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Box height={600}>
                <ResponsiveContainer width="100%" height="100%">
                    {customerChartType === "bar" ? (
                        <BarChart
                            data={customerData}
                            margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                label={{ value: "Customer Status", position: "bottom", offset: 0 }}
                                tick={{ fontSize: 20 }}
                            />
                            <YAxis
                                domain={[0, Math.ceil(maxCustomerValue * 1.1)]}
                                allowDecimals={false}
                                label={{ value: "Number of Customers", angle: -90, position: "insideLeft", offset: 0 }}
                                tick={{ fontSize: 20 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    fontSize: 16,
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: 16 }} />
                            <Bar dataKey="value" barSize={60}>
                                {customerData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart width={400} height={400}>
                            <Pie
                                data={customerData}
                                cx={200}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {customerData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Paper>
    );

    const renderInteractionChart = () => (
        <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">
                    Interaction Status
                </Typography>
                <ToggleButtonGroup
                    value={interactionChartType}
                    exclusive
                    onChange={handleInteractionChartTypeChange}
                    aria-label="interaction chart type"
                    size="small"
                    sx={{ 
                        backgroundColor: 'white',
                        '& .MuiToggleButton-root': {
                            px: 2,
                            py: 1,
                            '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            },
                        },
                    }}
                >
                    <ToggleButton value="bar" aria-label="bar chart">
                        <BarChartIcon sx={{ mr: 1 }} />
                        Bar
                    </ToggleButton>
                    <ToggleButton value="pie" aria-label="pie chart">
                        <PieChartIcon sx={{ mr: 1 }} />
                        Pie
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Box height={600}>
                <ResponsiveContainer width="100%" height="100%">
                    {interactionChartType === "bar" ? (
                        <BarChart
                            data={interactionData}
                            margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                label={{ value: "Interaction Status", position: "bottom", offset: 0 }}
                                tick={{ fontSize: 20 }}
                            />
                            <YAxis
                                domain={[0, Math.ceil(maxInteractionValue * 1.1)]}
                                allowDecimals={false}
                                label={{ value: "Number of Interactions", angle: -90, position: "insideLeft", offset: 0 }}
                                tick={{ fontSize: 20 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    fontSize: 16,
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: 16 }} />
                            <Bar dataKey="value" barSize={60}>
                                {interactionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart width={400} height={400}>
                            <Pie
                                data={interactionData}
                                cx={200}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {interactionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </Box>
        </Paper>
    );

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

                {/* Stats Cards */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                    {stats.map((stat, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 140,
                                bgcolor: stat.color,
                                color: 'white',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                                    {stat.title}
                                </Typography>
                                {stat.icon}
                            </Box>
                            <Typography component="p" variant="h4">
                                {stat.value}
                            </Typography>
                        </Paper>
                    ))}
                </Box>

                {/* Charts */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                    {renderCustomerChart()}
                    {renderInteractionChart()}
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard; 