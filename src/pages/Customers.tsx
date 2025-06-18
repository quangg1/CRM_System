import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CustomerList from '../components/Customers/CustomerList';
import CustomerForm from '../components/Customers/CustomerForm';
import customerService, { CreateCustomerData, UpdateCustomerData } from '../services/customerService';
import { Customer } from '../types';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError('Failed to load customers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomer = async (customerData: CreateCustomerData) => {
        try {
            const newCustomer = await customerService.create(customerData);
            setCustomers((prev) => [newCustomer, ...prev]);
            setOpenForm(false);
            setSelectedCustomer(undefined);
        } catch (err) {
            console.error('Error creating customer:', err);
            setError('Failed to create customer. Please try again.');
        }
    };

    const handleEditCustomer = async (customerData: UpdateCustomerData) => {
        if (selectedCustomer) {
            try {
                const updatedCustomer = await customerService.update(selectedCustomer.id, customerData);
                setCustomers((prev) =>
                    prev.map((c) => (c.id === selectedCustomer.id ? updatedCustomer : c))
                );
                setOpenForm(false);
                setSelectedCustomer(undefined);
            } catch (err) {
                console.error('Error updating customer:', err);
                setError('Failed to update customer. Please try again.');
            }
        }
    };

    const handleDeleteCustomer = async (customer: Customer) => {
        try {
            await customerService.delete(customer.id);
            setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
        } catch (err) {
            console.error('Error deleting customer:', err);
            setError('Failed to delete customer. Please try again.');
        }
    };

    const handleViewCustomer = (customer: Customer) => {
        // Implement view customer logic
        console.log('View customer:', customer);
    };

    if (loading) {
        return (
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    pt: 8,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                pt: 8,
                px: 3,
            }}
        >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Customers ({customers.length})
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedCustomer(undefined);
                            setOpenForm(true);
                        }}
                    >
                        Add Customer
                    </Button>
                </Box>
                <CustomerList
                    customers={customers}
                    onEdit={(customer) => {
                        setSelectedCustomer(customer);
                        setOpenForm(true);
                    }}
                    onDelete={handleDeleteCustomer}
                    onView={handleViewCustomer}
                />
                <CustomerForm
                    open={openForm}
                    customer={selectedCustomer}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedCustomer(undefined);
                    }}
                    onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}
                />
            </Container>
        </Box>
    );
};

export default Customers; 