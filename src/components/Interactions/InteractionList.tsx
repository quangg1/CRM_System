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
import { Visibility, Edit, Delete, Search } from '@mui/icons-material';
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

const typeOptions: Interaction['type'][] = ['call', 'email', 'meeting', 'note'];

const getTypeLabel = (type: Interaction['type']) => {
    switch (type) {
        case 'call': return 'Call';
        case 'email': return 'Email';
        case 'meeting': return 'Meeting';
        case 'note': return 'Note';
        default: return type;
    }
};

const statusOptions: Interaction['status'][] = ['scheduled', 'completed', 'cancelled'];
const getStatusLabel = (status: Interaction['status']) => {
    switch (status) {
        case 'scheduled': return 'Scheduled';
        case 'completed': return 'Completed';
        case 'cancelled': return 'Cancelled';
        default: return status;
    }
};
const getStatusColor = (status: Interaction['status']) => {
    switch (status) {
        case 'completed': return 'success';
        case 'scheduled': return 'warning';
        case 'cancelled': return 'error';
        default: return 'default';
    }
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

    const [typeMenuAnchor, setTypeMenuAnchor] = useState<{
        element: HTMLElement;
        interaction: Interaction;
    } | null>(null);

    const [statusMenuAnchor, setStatusMenuAnchor] = useState<{
        element: HTMLElement;
        interaction: Interaction;
    } | null>(null);

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

    const handleTypeClick = (event: React.MouseEvent<HTMLElement>, interaction: Interaction) => {
        event.stopPropagation();
        setTypeMenuAnchor({ element: event.currentTarget, interaction });
    };

    const handleTypeMenuClose = () => {
        setTypeMenuAnchor(null);
    };

    const handleTypeChange = (newType: Interaction['type']) => {
        handleTypeMenuClose();
        if (typeMenuAnchor && typeof onTypeChange === 'function') {
            onTypeChange(typeMenuAnchor.interaction, newType);
        }
    };

    const handleStatusClick = (event: React.MouseEvent<HTMLElement>, interaction: Interaction) => {
        event.stopPropagation();
        setStatusMenuAnchor({ element: event.currentTarget, interaction });
    };

    const handleStatusMenuClose = () => {
        setStatusMenuAnchor(null);
    };

    const handleStatusChange = (newStatus: Interaction['status']) => {
        handleStatusMenuClose();
        if (statusMenuAnchor && typeof onStatusChange === 'function') {
            onStatusChange(statusMenuAnchor.interaction, newStatus);
        }
    };

    React.useEffect(() => {
        if (
            typeMenuAnchor &&
            !interactions.some(i => i.id === typeMenuAnchor.interaction.id)
        ) {
            setTypeMenuAnchor(null);
        }
        if (
            statusMenuAnchor &&
            !interactions.some(i => i.id === statusMenuAnchor.interaction.id)
        ) {
            setStatusMenuAnchor(null);
        }
    }, [interactions]);

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
                        <Chip
                            label={`${filteredInteractions.length} kết quả`}
                            color="primary"
                            variant="outlined"
                        />
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
                                            label={getTypeLabel(interaction.type)}
                                            color={getTypeColor(interaction.type)}
                                            size="small"
                                            onClick={(e) => handleTypeClick(e, interaction)}
                                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                                        />
                                    </TableCell>
                                    <TableCell>{interaction.description}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusLabel(interaction.status)}
                                            color={getStatusColor(interaction.status)}
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
                {typeOptions.map((type) => (
                    <MenuItem key={type} onClick={() => handleTypeChange(type)}>
                        <ListItemIcon>
                            <Chip label={getTypeLabel(type)} color={getTypeColor(type)} size="small" />
                        </ListItemIcon>
                        <ListItemText primary={getTypeLabel(type)} />
                    </MenuItem>
                ))}
            </Menu>
            <Menu
                anchorEl={statusMenuAnchor?.element}
                open={Boolean(statusMenuAnchor)}
                onClose={handleStatusMenuClose}
            >
                {statusOptions.map((status) => (
                    <MenuItem key={status} onClick={() => handleStatusChange(status)}>
                        <ListItemIcon>
                            <Chip label={getStatusLabel(status)} color={getStatusColor(status)} size="small" />
                        </ListItemIcon>
                        <ListItemText primary={getStatusLabel(status)} />
                    </MenuItem>
                ))}
            </Menu>
        </Paper>
    );
};

export default InteractionList;
