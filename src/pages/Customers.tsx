import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CustomerList from '../components/Customers/CustomerList';
import CustomerForm from '../components/Customers/CustomerForm';
import { Customer } from '../types';

const Customers: React.FC = () => {
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | undefined>();

    const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newCustomer: Customer = {
            ...customerData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setCustomers((prev) => [...prev, newCustomer]);
    };

    const handleEditCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (selectedCustomer) {
            const updatedCustomer: Customer = {
                ...customerData,
                id: selectedCustomer.id,
                createdAt: selectedCustomer.createdAt,
                updatedAt: new Date().toISOString(),
            };
            setCustomers((prev) =>
                prev.map((c) => (c.id === selectedCustomer.id ? updatedCustomer : c))
            );
        }
    };

    const handleDeleteCustomer = (customer: Customer) => {
        setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
    };

    const handleViewCustomer = (customer: Customer) => {
        // Implement view customer logic
        console.log('View customer:', customer);
    };

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Customers
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