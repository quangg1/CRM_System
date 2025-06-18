import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import InteractionList from '../components/Interactions/InteractionList';
import InteractionForm from '../components/Interactions/InteractionForm';
import interactionService, { CreateInteractionData, UpdateInteractionData } from '../services/interactionService';
import customerService from '../services/customerService';
import { Interaction, Customer } from '../types';

const Interactions: React.FC = () => {
    const [interactions, setInteractions] = useState<Interaction[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedInteraction, setSelectedInteraction] = useState<Interaction | undefined>();

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch interactions and customers in parallel
            const [interactionsData, customersData] = await Promise.all([
                interactionService.getAll(),
                customerService.getAll()
            ]);
            
            setInteractions(interactionsData);
            setCustomers(customersData);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddInteraction = async (interactionData: CreateInteractionData) => {
        try {
            const newInteraction = await interactionService.create(interactionData);
            setInteractions((prev) => [newInteraction, ...prev]);
            setOpenForm(false);
            setSelectedInteraction(undefined);
        } catch (err) {
            console.error('Error creating interaction:', err);
            setError('Failed to create interaction. Please try again.');
        }
    };

    const handleEditInteraction = async (interactionData: UpdateInteractionData) => {
        if (selectedInteraction) {
            try {
                const updatedInteraction = await interactionService.update(selectedInteraction.id, interactionData);
                setInteractions((prev) =>
                    prev.map((i) => (i.id === selectedInteraction.id ? updatedInteraction : i))
                );
                setOpenForm(false);
                setSelectedInteraction(undefined);
            } catch (err) {
                console.error('Error updating interaction:', err);
                setError('Failed to update interaction. Please try again.');
            }
        }
    };

    const handleDeleteInteraction = async (interaction: Interaction) => {
        try {
            await interactionService.delete(interaction.id);
            setInteractions((prev) => prev.filter((i) => i.id !== interaction.id));
        } catch (err) {
            console.error('Error deleting interaction:', err);
            setError('Failed to delete interaction. Please try again.');
        }
    };

    const handleViewInteraction = (interaction: Interaction) => {
        // Implement view interaction logic
        console.log('View interaction:', interaction);
    };

    const formatDateForMySQL = (dateStr: string) => {
        const d = new Date(dateStr);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    const handleTypeChange = async (interaction: Interaction, newType: Interaction['type']) => {
        try {
            const updated = await interactionService.update(interaction.id, {
                ...interaction,
                type: newType,
                date: formatDateForMySQL(interaction.date),
            });
            setInteractions((prev) => prev.map((i) => (i.id === interaction.id ? updated : i)));
        } catch (err) {
            console.error('Error updating interaction type:', err);
            setError('Failed to update interaction type. Please try again.');
        }
    };

    const handleStatusChange = async (interaction: Interaction, newStatus: Interaction['status']) => {
        try {
            const updated = await interactionService.update(interaction.id, {
                ...interaction,
                status: newStatus,
                date: formatDateForMySQL(interaction.date),
            });
            setInteractions((prev) => prev.map((i) => (i.id === interaction.id ? updated : i)));
        } catch (err) {
            console.error('Error updating interaction status:', err);
            setError('Failed to update interaction status. Please try again.');
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
                        Interactions ({interactions.length})
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedInteraction(undefined);
                            setOpenForm(true);
                        }}
                    >
                        Add Interaction
                    </Button>
                </Box>
                <InteractionList
                    interactions={interactions}
                    customers={customers}
                    onEdit={(interaction) => {
                        setSelectedInteraction(interaction);
                        setOpenForm(true);
                    }}
                    onDelete={handleDeleteInteraction}
                    onView={handleViewInteraction}
                    onTypeChange={handleTypeChange}
                    onStatusChange={handleStatusChange}
                />
                <InteractionForm
                    open={openForm}
                    interaction={selectedInteraction}
                    customers={customers.map(({ id, name }) => ({ id, name }))}
                    onClose={() => {
                        setOpenForm(false);
                        setSelectedInteraction(undefined);
                    }}
                    onSubmit={selectedInteraction ? handleEditInteraction : handleAddInteraction}
                />
            </Container>
        </Box>
    );
};

export default Interactions; 