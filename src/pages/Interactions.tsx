import React from 'react';
import { Box, Container, Typography, Button, Theme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import InteractionList from '../components/Interactions/InteractionList';
import InteractionForm from '../components/Interactions/InteractionForm';
import { Interaction, Customer } from '../types';

const Interactions: React.FC = () => {
    const [interactions, setInteractions] = React.useState<Interaction[]>([]);
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [selectedInteraction, setSelectedInteraction] = React.useState<Interaction | undefined>();

    const handleAddInteraction = (interactionData: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newInteraction: Interaction = {
            ...interactionData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setInteractions((prev) => [...prev, newInteraction]);
    };

    const handleEditInteraction = (interactionData: Omit<Interaction, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (selectedInteraction) {
            const updatedInteraction: Interaction = {
                ...interactionData,
                id: selectedInteraction.id,
                createdAt: selectedInteraction.createdAt,
                updatedAt: new Date().toISOString(),
            };
            setInteractions((prev) =>
                prev.map((i) => (i.id === selectedInteraction.id ? updatedInteraction : i))
            );
        }
    };

    const handleDeleteInteraction = (interaction: Interaction) => {
        setInteractions((prev) => prev.filter((i) => i.id !== interaction.id));
    };

    const handleViewInteraction = (interaction: Interaction) => {
        // Implement view interaction logic
        console.log('View interaction:', interaction);
    };

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme: Theme) =>
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
                        Interactions
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