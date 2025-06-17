import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { Customer } from '../../types';
import { SelectChangeEvent } from '@mui/material/Select';

interface CustomerFormProps {
    open: boolean;
    customer?: Customer;
    onClose: () => void;
    onSubmit: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const initialCustomer = {
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead' as 'lead' | 'customer' | 'inactive',
    notes: '',
};

const CustomerForm: React.FC<CustomerFormProps> = ({
    open,
    customer,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = React.useState<typeof initialCustomer>(initialCustomer);

    React.useEffect(() => {
        if (customer) {
            const { id, createdAt, updatedAt, ...customerData } = customer;
            setFormData(customerData);
        } else {
            setFormData(initialCustomer);
        }
    }, [customer]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {customer ? 'Edit Customer' : 'Add New Customer'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <TextField
                                name="phone"
                                label="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <TextField
                            name="company"
                            label="Company"
                            value={formData.company}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleSelectChange}
                                label="Status"
                            >
                                <MenuItem value="lead">Lead</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="notes"
                            label="Notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {customer ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CustomerForm; 