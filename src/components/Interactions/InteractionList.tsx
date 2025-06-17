import React, { useState } from 'react';
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
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { Interaction, Customer } from '../../types';

interface InteractionListProps {
    interactions: Interaction[];
    customers: Customer[];
    onView: (interaction: Interaction) => void;
    onEdit: (interaction: Interaction) => void;
    onDelete: (interaction: Interaction) => void;
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
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    return (
        <Paper>
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
                        {interactions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((interaction) => (
                                <TableRow key={interaction.id}>
                                    <TableCell>
                                        {new Date(interaction.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{getCustomerName(interaction.customerId)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={interaction.type}
                                            color={getTypeColor(interaction.type)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{interaction.description}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={interaction.status}
                                            color={interaction.status === 'completed' ? 'success' : 'warning'}
                                            size="small"
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
                count={interactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default InteractionList; 