import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Chat as ChatIcon,
} from '@mui/icons-material';

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Interactions', icon: <ChatIcon />, path: '/interactions' },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    CRM System
                </Typography>
            </Box>
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.text}
                            sx={{ 
                                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                                '& .MuiTypography-root': {
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar; 