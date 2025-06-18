import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Edit, Delete, Visibility, Circle } from '@mui/icons-material';
import { Customer } from '../../types';

interface CustomerListProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
    onView: (customer: Customer) => void;
    onStatusChange?: (customer: Customer, newStatus: Customer['status']) => void;
}

const getStatusColor = (status: Customer['status']) => {
    switch (status) {
        case 'lead':
            return 'warning';
        case 'customer':
            return 'success';
        case 'inactive':
            return 'error';
        default:
            return 'default';
    }
};

const CustomerList: React.FC<CustomerListProps> = ({
    customers,
    onEdit,
    onDelete,
    onView,
    onStatusChange,
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [statusMenuAnchor, setStatusMenuAnchor] = React.useState<{
        element: HTMLElement;
        customer: Customer;
    } | null>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleStatusClick = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
        event.stopPropagation();
        setStatusMenuAnchor({
            element: event.currentTarget,
            customer: customer
        });
    };

    const handleStatusMenuClose = () => {
        setStatusMenuAnchor(null);
    };

    const handleStatusChange = (newStatus: Customer['status']) => {
        if (statusMenuAnchor && onStatusChange) {
            console.log('🔄 USER ACTION: Change Customer Status', {
                customerId: statusMenuAnchor.customer.id,
                customerName: statusMenuAnchor.customer.name,
                oldStatus: statusMenuAnchor.customer.status,
                newStatus: newStatus,
                timestamp: new Date().toLocaleString('vi-VN')
            });
            onStatusChange(statusMenuAnchor.customer, newStatus);
        }
        handleStatusMenuClose();
    };

    const getStatusIcon = (status: Customer['status']) => {
        const color = getStatusColor(status);
        return <Circle sx={{ fontSize: 8, color: `${color}.main` }} />;
    };

    const getStatusLabel = (status: Customer['status']) => {
        switch (status) {
            case 'lead':
                return 'Lead';
            case 'customer':
                return 'Customer';
            case 'inactive':
                return 'Inactive';
            default:
                return status;
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((customer) => (
                                <TableRow hover key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.company}</TableCell>                                    <TableCell>
                                        <Chip
                                            label={getStatusLabel(customer.status)}
                                            color={getStatusColor(customer.status)}
                                            size="small"
                                            onClick={(e) => handleStatusClick(e, customer)}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    opacity: 0.8
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="View">
                                            <IconButton
                                                size="small"
                                                onClick={() => onView(customer)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={() => onEdit(customer)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                onClick={() => onDelete(customer)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Menu
                anchorEl={statusMenuAnchor?.element}
                open={Boolean(statusMenuAnchor)}
                onClose={handleStatusMenuClose}
            >
                <MenuItem onClick={() => handleStatusChange('lead')}>
                    <ListItemIcon>
                        {getStatusIcon('lead')}
                    </ListItemIcon>
                    <ListItemText primary="Lead" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('customer')}>
                    <ListItemIcon>
                        {getStatusIcon('customer')}
                    </ListItemIcon>
                    <ListItemText primary="Customer" />
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('inactive')}>
                    <ListItemIcon>
                        {getStatusIcon('inactive')}
                    </ListItemIcon>
                    <ListItemText primary="Inactive" />
                </MenuItem>
            </Menu>
        </Paper>
    );
};

export default CustomerList;