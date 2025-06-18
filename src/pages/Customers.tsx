import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CustomerList from '../components/Customers/CustomerList';
import CustomerForm from '../components/Customers/CustomerForm';
import CustomerSearch from '../components/Customers/CustomerSearch';
import customerService, { CreateCustomerData, UpdateCustomerData } from '../services/customerService';
import { Customer } from '../types';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout;
            return (query: string) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    performSearch(query);
                }, 300);
            };
        })(),
        []
    );

    const performSearch = async (query: string) => {
        if (!query.trim()) {
            setFilteredCustomers(customers);
            setSearchLoading(false);
            return;
        }

        try {
            setSearchLoading(true);
            const searchResults = await customerService.search(query);
            setFilteredCustomers(searchResults);
        } catch (err) {
            console.error('Error searching customers:', err);
            setError('Failed to search customers. Please try again.');
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setSearchLoading(true);
            debouncedSearch(query);
        } else {
            setFilteredCustomers(customers);
            setSearchLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching customers...');
            const data = await customerService.getAll();
            console.log('Customers fetched:', data);
            setCustomers(data);
            setFilteredCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
            setError('Failed to load customers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomer = async (customerData: CreateCustomerData) => {
        try {
            console.log('Creating customer with data:', customerData);
            setError(null);
            const newCustomer = await customerService.create(customerData);
            console.log('Customer created successfully:', newCustomer);
            setCustomers((prev) => [newCustomer, ...prev]);
            setFilteredCustomers((prev) => [newCustomer, ...prev]);
            setOpenForm(false);
            setSelectedCustomer(undefined);
        } catch (err: any) {
            console.error('Error creating customer:', err);
            console.error('Error details:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            setError(`Failed to create customer: ${err.message}`);
        }
    };

    const handleEditCustomer = async (customerData: UpdateCustomerData) => {
        if (selectedCustomer) {
            try {
                console.log('Updating customer with data:', customerData);
                setError(null);
                const updatedCustomer = await customerService.update(selectedCustomer.id, customerData);
                console.log('Customer updated successfully:', updatedCustomer);
                setCustomers((prev) =>
                    prev.map((c) => (c.id === selectedCustomer.id ? updatedCustomer : c))
                );
                setFilteredCustomers((prev) =>
                    prev.map((c) => (c.id === selectedCustomer.id ? updatedCustomer : c))
                );
                setOpenForm(false);
                setSelectedCustomer(undefined);
            } catch (err: any) {
                console.error('Error updating customer:', err);
                setError(`Failed to update customer: ${err.message}`);
            }
        }
    };

    const handleDeleteCustomer = async (customer: Customer) => {
        try {
            console.log('Deleting customer:', customer.id);
            setError(null);
            await customerService.delete(customer.id);
            console.log('Customer deleted successfully');
            setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
            setFilteredCustomers((prev) => prev.filter((c) => c.id !== customer.id));
        } catch (err: any) {
            console.error('Error deleting customer:', err);
            setError(`Failed to delete customer: ${err.message}`);
        }
    };

    const handleViewCustomer = (customer: Customer) => {
        // Implement view customer logic
        console.log('View customer:', customer);
    };

    const handleStatusChange = async (customer: Customer, newStatus: Customer['status']) => {
        try {
            console.log('🔄 STATUS CHANGE: Updating customer status', {
                customerId: customer.id,
                customerName: customer.name,
                oldStatus: customer.status,
                newStatus: newStatus,
                timestamp: new Date().toLocaleString('vi-VN')
            });
            
            setError(null);
            const updatedCustomer = await customerService.update(customer.id, {
                ...customer,
                status: newStatus
            });
            
            console.log('✅ Customer status updated successfully:', updatedCustomer);
            
            // Update both customers arrays
            setCustomers((prev) =>
                prev.map((c) => (c.id === customer.id ? updatedCustomer : c))
            );
            setFilteredCustomers((prev) =>
                prev.map((c) => (c.id === customer.id ? updatedCustomer : c))
            );
        } catch (err: any) {
            console.error('❌ Error updating customer status:', err);
            setError(`Failed to update customer status: ${err.message}`);
        }
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
                        Customers ({searchQuery ? filteredCustomers.length : customers.length})
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
                <CustomerSearch
                    onSearch={handleSearch}
                    searchQuery={searchQuery}
                    resultCount={searchQuery ? filteredCustomers.length : undefined}
                    loading={searchLoading}
                />
                <CustomerList
                    customers={filteredCustomers}
                    onEdit={(customer) => {
                        setSelectedCustomer(customer);
                        setOpenForm(true);
                    }}
                    onDelete={handleDeleteCustomer}
                    onView={handleViewCustomer}
                    onStatusChange={handleStatusChange}
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