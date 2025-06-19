import React, { useState, useMemo } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    TextField,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Visibility, Edit, Delete, Search, Circle } from '@mui/icons-material';
import { Interaction, Customer } from '../../types';

interface InteractionListProps {
    interactions: Interaction[];
    customers: Customer[];
    onView: (interaction: Interaction) => void;
    onEdit: (interaction: Interaction) => void;
    onDelete: (interaction: Interaction) => void;
    onTypeChange?: (interaction: Interaction, newType: Interaction['type']) => void;
    onStatusChange?: (interaction: Interaction, newStatus: Interaction['status']) => void;
}

const getTypeColor = (type: Interaction['type']) => {
    switch (type) {
        case 'email':
            return 'primary';
        case 'call':
            return 'success';
        case 'meeting':
            return 'warning';
        case 'note':
            return 'info';
        default:
            return 'default';
    }
};

const getStatusColor = (status: Interaction['status']) => {
    switch (status) {
        case 'completed':
            return 'success';
        case 'scheduled':
            return 'warning';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const getTypeIcon = (type: Interaction['type']) => {
    let color;
    switch (type) {
        case 'call': color = 'success.main'; break;
        case 'email': color = 'primary.main'; break;
        case 'meeting': color = 'warning.main'; break;
        case 'note': color = 'info.main'; break;
        default: color = 'grey.500';
    }
    return <Circle sx={{ fontSize: 12, color }} />;
};

const getStatusIcon = (status: Interaction['status']) => {
    let color;
    switch (status) {
        case 'completed': color = 'success.main'; break;
        case 'scheduled': color = 'warning.main'; break;
        case 'cancelled': color = 'error.main'; break;
        default: color = 'grey.500';
    }
    return <Circle sx={{ fontSize: 12, color }} />;
};

const InteractionList: React.FC<InteractionListProps> = ({
    interactions,
    customers,
    onView,
    onEdit,
    onDelete,
    onTypeChange,
    onStatusChange,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchName, setSearchName] = useState('');
    const [searchStatus, setSearchStatus] = useState<string>('all');
    const [typeMenuAnchor, setTypeMenuAnchor] = useState<{ element: HTMLElement, interaction: Interaction } | null>(null);
    const [statusMenuAnchor, setStatusMenuAnchor] = useState<{ element: HTMLElement, interaction: Interaction } | null>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getCustomerName = (customerId: string) => {
        const customer = customers.find((c) => c.id === customerId);
        return customer ? customer.name : 'Unknown Customer';
    };

    // Filter interactions based on search criteria
    const filteredInteractions = useMemo(() => {
        return interactions.filter((interaction) => {
            const customerName = getCustomerName(interaction.customer_id);
            const nameMatch = customerName.toLowerCase().includes(searchName.toLowerCase());
            const statusMatch = searchStatus === 'all' || interaction.status === searchStatus;

            return nameMatch && statusMatch;
        });
    }, [interactions, customers, searchName, searchStatus]);

    // Reset page when search criteria change
    React.useEffect(() => {
        setPage(0);
    }, [searchName, searchStatus]);

    // Type menu handlers
    const handleTypeClick = (event: React.MouseEvent<HTMLElement>, interaction: Interaction) => {
        event.stopPropagation();
        setTypeMenuAnchor({ element: event.currentTarget, interaction });
    };
    const handleTypeMenuClose = () => setTypeMenuAnchor(null);
    const handleTypeChange = (newType: Interaction['type']) => {
        if (typeMenuAnchor && onTypeChange) {
            onTypeChange(typeMenuAnchor.interaction, newType);
        }
        handleTypeMenuClose();
    };

    // Status menu handlers
    const handleStatusClick = (event: React.MouseEvent<HTMLElement>, interaction: Interaction) => {
        event.stopPropagation();
        setStatusMenuAnchor({ element: event.currentTarget, interaction });
    };
    const handleStatusMenuClose = () => setStatusMenuAnchor(null);
    const handleStatusChange = (newStatus: Interaction['status']) => {
        if (statusMenuAnchor && onStatusChange) {
            onStatusChange(statusMenuAnchor.interaction, newStatus);
        }
        handleStatusMenuClose();
    };

    return (
        <Paper>
            {/* Search Section */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        label="enter name of customer"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        InputProps={{
                            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        size="small"
                        sx={{ minWidth: 250 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={searchStatus}
                            label="Trạng thái"
                            onChange={(e) => setSearchStatus(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="scheduled">Scheduled</MenuItem>
                            <MenuItem value="cancelled">Cancel</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ ml: 'auto' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                border: '1px solid #1976d2',
                                borderRadius: '16px',
                                color: '#1976d2',
                                fontWeight: 500,
                                background: '#fff',
                                fontSize: 14,
                            }}
                        >
                            {`${filteredInteractions.length} kết quả`}
                        </span>
                    </Box>
                </Box>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInteractions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((interaction) => (
                                <TableRow key={interaction.id}>
                                    <TableCell>
                                        {new Date(interaction.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{getCustomerName(interaction.customer_id)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={interaction.type}
                                            color={getTypeColor(interaction.type)}
                                            size="small"
                                            onClick={(e) => handleTypeClick(e, interaction)}
                                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                                        />
                                    </TableCell>
                                    <TableCell>{interaction.description}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={interaction.status}
                                            color={interaction.status === 'completed' ? 'success' : interaction.status === 'scheduled' ? 'warning' : 'error'}
                                            size="small"
                                            onClick={(e) => handleStatusClick(e, interaction)}
                                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(interaction)}
                                        >
                                            <Visibility />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(interaction)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(interaction)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredInteractions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Menu
                anchorEl={typeMenuAnchor?.element}
                open={Boolean(typeMenuAnchor)}
                onClose={handleTypeMenuClose}
            >
                <MenuItem onClick={() => handleTypeChange('call')}>
                    <ListItemIcon>{getTypeIcon('call')}</ListItemIcon>
                    <ListItemText primary="Call" />
                </MenuItem>
                <MenuItem onClick={() => handleTypeChange('email')}>
                    <ListItemIcon>{getTypeIcon('email')}</ListItemIcon>
                    <ListItemText primary="Email" />
                </MenuItem>
                <MenuItem onClick={() => handleTypeChange('meeting')}>
                    <ListItemIcon>{getTypeIcon('meeting')}</ListItemIcon>
                    <ListItemText primary="Meeting" />
                </MenuItem>
                <MenuItem onClick={() => handleTypeChange('note')}>
                    <ListItemIcon>{getTypeIcon('note')}</ListItemIcon>
                    <ListItemText primary="Note" />
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={statusMenuAnchor?.element}
                open={Boolean(statusMenuAnchor)}
                onClose={handleStatusMenuClose}
            >
                <MenuItem onClick={() => handleStatusChange('completed')}>
                    <ListItemIcon>{getStatusIcon('completed')}</ListItemIcon>
                    <ListItemText primary="Completed" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('scheduled')}>
                    <ListItemIcon>{getStatusIcon('scheduled')}</ListItemIcon>
                    <ListItemText primary="Scheduled" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('cancelled')}>
                    <ListItemIcon>{getStatusIcon('cancelled')}</ListItemIcon>
                    <ListItemText primary="Cancelled" />
                </MenuItem>
            </Menu>
        </Paper>
    );
};

export default InteractionList;
