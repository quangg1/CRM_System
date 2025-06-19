import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField, Select, MenuItem, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CustomerList from '../components/Customers/CustomerList';
import CustomerForm from '../components/Customers/CustomerForm';
import CustomerSearch from '../components/Customers/CustomerSearch';
import customerService, { CreateCustomerData, UpdateCustomerData, CustomerProduct, Product } from '../services/customerService';
import { Customer } from '../types';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState<string>('all');
    const [openDetail, setOpenDetail] = useState(false);
    const [detailCustomer, setDetailCustomer] = useState<Customer | null>(null);
    const [customerProducts, setCustomerProducts] = useState<CustomerProduct[]>([]);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [editNote, setEditNote] = useState('');
    const [editProducts, setEditProducts] = useState<CustomerProduct[]>([]);
    const [addProductId, setAddProductId] = useState('');
    const [saving, setSaving] = useState(false);

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter customers based on search criteria
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const nameMatch = customer.name.toLowerCase().includes(searchQuery.toLowerCase());
            const statusMatch = searchStatus === 'all' || customer.status === searchStatus;

            return nameMatch && statusMatch;
        });
    }, [customers, searchQuery, searchStatus]);

    const handleSearch = (query: string, status: string) => {
        setSearchQuery(query);
        setSearchStatus(status);
    };

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching customers...');
            const data = await customerService.getAll();
            console.log('Customers fetched:', data);
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
            console.log('Creating customer with data:', customerData);
            setError(null);
            const newCustomer = await customerService.create(customerData);
            console.log('Customer created successfully:', newCustomer);
            setCustomers((prev) => [newCustomer, ...prev]);
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
        } catch (err: any) {
            console.error('Error deleting customer:', err);
            setError(`Failed to delete customer: ${err.message}`);
        }
    };

    const handleViewCustomer = async (customer: Customer) => {
        setDetailCustomer(customer);
        setEditNote(customer.notes || '');
        setOpenDetail(true);
        setLoadingDetail(true);
        try {
            const [products, allProds] = await Promise.all([
                customerService.getCustomerProducts(customer.id),
                customerService.getAllProducts()
            ]);
            console.log('customerProducts:', products);
            console.log('allProducts:', allProds);
            setCustomerProducts(products);
            setEditProducts(products);
            setAllProducts(allProds);
        } catch (err) {
            setCustomerProducts([]);
            setEditProducts([]);
            setAllProducts([]);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setDetailCustomer(null);
        setCustomerProducts([]);
    };

    const handleStatusChange = async (customer: Customer, newStatus: Customer['status']) => {
        try {
            console.log(' STATUS CHANGE: Updating customer status', {
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

            console.log('Customer status updated successfully:', updatedCustomer);

            // Update customers array - filteredCustomers will automatically update via useMemo
            setCustomers((prev) =>
                prev.map((c) => (c.id === customer.id ? updatedCustomer : c))
            );
        } catch (err: any) {
            console.error('Error updating customer status:', err);
            setError(`Failed to update customer status: ${err.message}`);
        }
    };

    const handleEditProductStatus = (id: string, status: string) => {
        setEditProducts((prev) => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const handleDeleteProduct = (id: string) => {
        setEditProducts((prev) => prev.filter(p => p.id !== id));
    };

    const handleAddProduct = () => {
        if (!addProductId) return;
        const prod = allProducts.find(p => p.id === addProductId);
        if (!prod) return;
        setEditProducts((prev) => [
            ...prev,
            {
                id: 'new-' + prod.id,
                customer_id: detailCustomer!.id,
                product_id: prod.id,
                status: 'interested',
                product_name: prod.name,
                product_status: prod.status,
                created_at: '',
                updated_at: ''
            }
        ]);
        setAddProductId('');
    };

    const handleSaveDetail = async () => {
        if (!detailCustomer) return;
        setSaving(true);
        try {
            // Update note nếu thay đổi
            if (editNote !== detailCustomer.notes) {
                await customerService.update(detailCustomer.id, { ...detailCustomer, notes: editNote });
            }
            // Xử lý sản phẩm: thêm, sửa, xoá
            // Sản phẩm cũ
            const oldIds = customerProducts.map(p => p.id);
            // Sản phẩm mới
            const newIds = editProducts.map(p => p.id);
            // Xoá
            for (const oldP of customerProducts) {
                if (!newIds.includes(oldP.id)) {
                    await customerService.deleteCustomerProduct(oldP.id);
                }
            }
            // Thêm mới
            for (const newP of editProducts) {
                if (newP.id.startsWith('new-')) {
                    await customerService.addCustomerProduct({
                        customer_id: detailCustomer.id,
                        product_id: newP.product_id,
                        status: newP.status
                    });
                } else {
                    // Sửa status nếu thay đổi
                    const oldP = customerProducts.find(p => p.id === newP.id);
                    if (oldP && oldP.status !== newP.status) {
                        await customerService.updateCustomerProduct(newP.id, { status: newP.status });
                    }
                }
            }
            // Reload lại data
            await fetchCustomers();
            setOpenDetail(false);
        } catch (err: any) {
            setError('Failed to save changes: ' + err.message);
        } finally {
            setSaving(false);
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
                        Customers ({filteredCustomers.length})
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
                    searchStatus={searchStatus}
                    resultCount={filteredCustomers.length}
                    loading={false}
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
                <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
                    <DialogTitle>Customer Detail</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1"><b>Note:</b></Typography>
                        <TextField
                            value={editNote}
                            onChange={e => setEditNote(e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="subtitle1" sx={{ mt: 2 }}><b>Products:</b></Typography>
                        {loadingDetail ? (
                            <CircularProgress size={24} />
                        ) : (
                            <>
                                <List>
                                    {editProducts.length === 0 && <ListItem><ListItemText primary="No products" /></ListItem>}
                                    {editProducts.map((prod) => {
                                        console.log('render prod:', prod);
                                        return (
                                            <ListItem key={prod.id} secondaryAction={
                                                <IconButton edge="end" onClick={() => handleDeleteProduct(prod.id)}><DeleteIcon /></IconButton>
                                            }>
                                                <ListItemText
                                                    primary={prod.product_name}
                                                    secondary={
                                                        <Select
                                                            value={prod.status}
                                                            onChange={e => handleEditProductStatus(prod.id, e.target.value)}
                                                            size="small"
                                                            sx={{ minWidth: 120 }}
                                                        >
                                                            <MenuItem value="interested">Interested</MenuItem>
                                                            <MenuItem value="in_progress">In Progress</MenuItem>
                                                            <MenuItem value="purchased">Purchased</MenuItem>
                                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                                        </Select>
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Select
                                        value={addProductId}
                                        onChange={e => setAddProductId(e.target.value)}
                                        displayEmpty
                                        size="small"
                                        sx={{ minWidth: 200, mr: 2 }}
                                    >
                                        <MenuItem value="" disabled>Chọn sản phẩm để thêm</MenuItem>
                                        {allProducts.filter(p => !editProducts.some(ep => ep.product_id === p.id)).map(p => (
                                            <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <Button variant="outlined" onClick={handleAddProduct} disabled={!addProductId}>Thêm sản phẩm</Button>
                                </Box>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetail} disabled={saving}>Đóng</Button>
                        <Button onClick={handleSaveDetail} variant="contained" disabled={saving}>Lưu</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Customers;
