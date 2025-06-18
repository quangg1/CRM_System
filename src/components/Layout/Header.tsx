import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material';
import { 
    Notifications, 
    Person, 
    Settings as SettingsIcon, 
    Logout 
} from '@mui/icons-material';
import authService from '../../services/authService';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const currentUser = authService.getCurrentUser();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            console.log("🔓 Logging out...");
            await authService.logout();
            console.log("✅ Logout successful");
            navigate('/login');
            handleClose();
        } catch (error) {
            console.error("❌ Logout error:", error);
            // Even if logout API fails, still navigate to login
            navigate('/login');
            handleClose();
        }
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleSettings = () => {
        navigate('/settings');
        handleClose();
    };

    const getUserInitials = (name: string): string => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AppBar position="fixed" sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            marginBottom: '20px'
        }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    CRM System
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color="inherit">
                    <Notifications />
                </IconButton>
                <IconButton
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                        {currentUser ? getUserInitials(currentUser.name) : 'U'}
                    </Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {currentUser?.name || 'User'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {currentUser?.email || 'user@example.com'}
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfile}>
                        <Person sx={{ mr: 1 }} />
                        Hồ sơ
                    </MenuItem>
                    <MenuItem onClick={handleSettings}>
                        <SettingsIcon sx={{ mr: 1 }} />
                        Cài đặt
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1 }} />
                        Đăng xuất
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 