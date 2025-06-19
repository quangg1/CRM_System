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
import { Phone, Email, Event, Note } from '@mui/icons-material';
import { Interaction } from '../../types';

interface RecentActivitiesProps {
    activities: Interaction[];
}

const getActivityIcon = (type: Interaction['type']) => {
    switch (type) {
        case 'call':
            return <Phone />;
        case 'email':
            return <Email />;
        case 'meeting':
            return <Event />;
        case 'note':
            return <Note />;
        default:
            return <Phone />;
    }
};

const getActivityColor = (type: Interaction['type']) => {
    switch (type) {
        case 'call':
            return '#1976d2';
        case 'email':
            return '#2e7d32';
        case 'meeting':
            return '#ed6c02';
        case 'note':
            return '#9c27b0';
        default:
            return '#1976d2';
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
    return (
        <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Upcoming Interactions
            </Typography>
            <List>
                {activities.length === 0 ? (
                    <ListItem>
                        <ListItemText
                            primary="No upcoming interactions"
                            secondary="You have no scheduled interactions at the moment."
                        />
                    </ListItem>
                ) : (
                    activities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                                        {getActivityIcon(activity.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} with ${activity.customer_name}`}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {activity.description}
                                            </Typography>
                                            {` — ${formatDate(activity.date)}`}
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))
                )}
            </List>
        </Paper>
    );
};

export default RecentActivities; 