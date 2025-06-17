import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import { Dashboard, People, CalendarToday, BarChart, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledDrawer = styled(Drawer)({
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        backgroundColor: '#1a237e',
        color: 'white',
    },
});

const StyledListItem = styled(ListItem)({
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '& .MuiListItemIcon-root': {
        color: 'white',
    },
});

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Customers', icon: <People />, path: '/customers' },
    { text: 'Interactions', icon: <CalendarToday />, path: '/interactions' },
    { text: 'Analytics', icon: <BarChart />, path: '/analytics' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <StyledDrawer variant="permanent" anchor="left">
            <List>
                {menuItems.map((item) => (
                    <StyledListItem
                        key={item.text}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </StyledListItem>
                ))}
            </List>
        </StyledDrawer>
    );
};

export default Sidebar; 