import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Interactions from './pages/Interactions';
import theme from './theme';

// Thêm import cho Settings và Analytics
const Settings = () => <div style={{ padding: 32 }}><h2>Settings</h2><p>Trang cài đặt đang được phát triển...</p></div>;
const Analytics = () => <div style={{ padding: 32 }}><h2>Analytics</h2><p>Trang phân tích đang được phát triển...</p></div>;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex' }}>
                    <Header />
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/interactions" element={<Interactions />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/analytics" element={<Analytics />} />
                        {/* Add more routes here */}
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
