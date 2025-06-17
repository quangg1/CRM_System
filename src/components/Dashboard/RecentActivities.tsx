import React from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Divider,
} from '@mui/material';
import { Phone, Email, Event } from '@mui/icons-material';

interface Activity {
    id: string;
    type: 'call' | 'email' | 'meeting';
    title: string;
    description: string;
    time: string;
}

interface RecentActivitiesProps {
    activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
        case 'call':
            return <Phone />;
        case 'email':
            return <Email />;
        case 'meeting':
            return <Event />;
        default:
            return <Phone />;
    }
};

const getActivityColor = (type: Activity['type']) => {
    switch (type) {
        case 'call':
            return '#1976d2';
        case 'email':
            return '#2e7d32';
        case 'meeting':
            return '#ed6c02';
        default:
            return '#1976d2';
    }
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
    return (
        <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Recent Activities
            </Typography>
            <List>
                {activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                                    {getActivityIcon(activity.type)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={activity.title}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {activity.description}
                                        </Typography>
                                        {` — ${activity.time}`}
                                    </>
                                }
                            />
                        </ListItem>
                        {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default RecentActivities; 