import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { Interaction } from '../../types';

interface InteractionFormProps {
    open: boolean;
    interaction?: Interaction;
    customers: { id: string; name: string }[];
    onClose: () => void;
    onSubmit: (data: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type InteractionType = Interaction['type'];
type InteractionStatus = Interaction['status'];

const initialFormData: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'> = {
    customerId: '',
    type: 'email',
    description: '',
    date: new Date().toISOString().split('T')[0],
    status: 'scheduled',
};

const InteractionForm: React.FC<InteractionFormProps> = ({
    open,
    interaction,
    customers,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>>(initialFormData);

    useEffect(() => {
        if (interaction) {
            setFormData({
                customerId: interaction.customerId,
                type: interaction.type,
                description: interaction.description,
                date: new Date(interaction.date).toISOString().split('T')[0],
                status: interaction.status,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [interaction]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {interaction ? 'Edit Interaction' : 'Add New Interaction'}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Customer</InputLabel>
                        <Select
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleSelectChange}
                            required
                        >
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={formData.type}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="call">Call</MenuItem>
                            <MenuItem value="meeting">Meeting</MenuItem>
                            <MenuItem value="note">Note</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value="scheduled">Scheduled</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {interaction ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default InteractionForm; 