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
} from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material';
import { Interaction, Customer } from '../../types';

interface InteractionListProps {
    interactions: Interaction[];
    customers: Customer[];
    onView: (interaction: Interaction) => void;
    onEdit: (interaction: Interaction) => void;
    onDelete: (interaction: Interaction) => void;
    onTypeChange: (interaction: Interaction, newType: "call" | "email" | "meeting" | "note") => Promise<void>;
    onStatusChange: (interaction: Interaction, newStatus: Interaction['status']) => Promise<void>;
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
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [statusValue, setStatusValue] = useState<Interaction['status']>('scheduled');

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
                                            label={interaction.type}
                                            color={getTypeColor(interaction.type)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{interaction.description}</TableCell>
                                    <TableCell>
                                        {editingStatusId === interaction.id ? (
                                            <Select
                                                value={statusValue}
                                                onChange={async (e) => {
                                                    const newStatus = e.target.value as Interaction['status'];
                                                    setStatusValue(newStatus);
                                                    await onStatusChange(interaction, newStatus);
                                                    setEditingStatusId(null);
                                                }}
                                                onBlur={() => setEditingStatusId(null)}
                                                size="small"
                                                autoFocus
                                                sx={{ minWidth: 120 }}
                                            >
                                                <MenuItem value="scheduled">Scheduled</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                                <MenuItem value="cancelled">Cancelled</MenuItem>
                                            </Select>
                                        ) : (
                                            <Chip
                                                label={interaction.status}
                                                color={interaction.status === 'completed' ? 'success' : 'warning'}
                                                size="small"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setEditingStatusId(interaction.id);
                                                    setStatusValue(interaction.status);
                                                }}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        )}
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
        </Paper>
    );
};

export default InteractionList;
