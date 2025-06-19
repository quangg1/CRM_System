import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InteractionList from '../components/Interactions/InteractionList';
import InteractionForm from '../components/Interactions/InteractionForm';
import interactionService, { CreateInteractionData, UpdateInteractionData, Activity } from '../services/interactionService';
import customerService, { Product } from '../services/customerService';
import { Interaction, Customer } from '../types';
import { TextField, Select, MenuItem, IconButton } from '@mui/material';

const Interactions: React.FC = () => {
    const [interactions, setInteractions] = useState<Interaction[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const [selectedInteraction, setSelectedInteraction] = useState<Interaction | undefined>();
    const [openDetail, setOpenDetail] = useState(false);
    const [detailInteraction, setDetailInteraction] = useState<Interaction | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [editActivities, setEditActivities] = useState<Activity[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);

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

    const handleViewInteraction = async (interaction: Interaction) => {
        setDetailInteraction(interaction);
        setOpenDetail(true);
        setLoadingDetail(true);
        try {
            const [acts, prod] = await Promise.all([
                interactionService.getActivities(interaction.id),
                customerService.getProductById(interaction.product_id)
            ]);
            setActivities(acts);
            setEditActivities(acts);
            setProduct(prod);
        } catch (err) {
            setActivities([]);
            setEditActivities([]);
            setProduct(null);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setDetailInteraction(null);
        setActivities([]);
        setEditActivities([]);
        setProduct(null);
    };

    const handleTypeChange = async (interaction: Interaction, newType: Interaction['type']) => {
        try {
            const updatedInteraction = await interactionService.update(interaction.id, { ...interaction, type: newType });
            setInteractions((prev) => prev.map((i) => (i.id === interaction.id ? updatedInteraction : i)));
        } catch (err) {
            setError('Failed to update interaction type. Please try again.');
        }
    };

    const handleStatusChange = async (interaction: Interaction, newStatus: Interaction['status']) => {
        try {
            const updatedInteraction = await interactionService.update(interaction.id, { ...interaction, status: newStatus });
            setInteractions((prev) => prev.map((i) => (i.id === interaction.id ? updatedInteraction : i)));
        } catch (err) {
            setError('Failed to update interaction status. Please try again.');
        }
    };

    const handleEditActivity = (id: string, field: keyof Activity, value: any) => {
        setEditActivities(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const handleDeleteActivity = (id: string) => {
        setEditActivities(prev => prev.filter(a => a.id !== id));
    };

    const handleAddActivity = () => {
        if (!detailInteraction) return;
        setEditActivities(prev => [
            ...prev,
            {
                id: 'new-' + Math.random().toString(36).slice(2),
                interaction_id: detailInteraction.id,
                type: 'note',
                title: '',
                description: '',
                created_at: '',
                updated_at: ''
            }
        ]);
    };

    const handleSaveDetail = async () => {
        if (!detailInteraction) return;
        setSaving(true);
        try {
            // Xoá activity
            for (const oldA of activities) {
                if (!editActivities.find(a => a.id === oldA.id)) {
                    await interactionService.deleteActivity(oldA.id);
                }
            }
            // Thêm mới và cập nhật
            for (const act of editActivities) {
                if (act.id.startsWith('new-')) {
                    await interactionService.addActivity({
                        interaction_id: detailInteraction.id,
                        type: act.type,
                        title: act.title,
                        description: act.description
                    });
                } else {
                    const oldA = activities.find(a => a.id === act.id);
                    if (oldA && (oldA.type !== act.type || oldA.title !== act.title || oldA.description !== act.description)) {
                        await interactionService.updateActivity(act.id, {
                            type: act.type,
                            title: act.title,
                            description: act.description
                        });
                    }
                }
            }
            // Reload lại data
            await fetchData();
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
                <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
                    <DialogTitle>Interaction Activities</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1"><b>Description:</b> {detailInteraction?.description || 'No description'}</Typography>
                        <Typography variant="subtitle1"><b>Product:</b> {product?.name || 'No product'}</Typography>
                        <Typography variant="subtitle1" sx={{ mt: 2 }}><b>Activities:</b></Typography>
                        {loadingDetail ? (
                            <CircularProgress size={24} />
                        ) : (
                            <>
                                <List>
                                    {editActivities.length === 0 && <ListItem><ListItemText primary="No activities" /></ListItem>}
                                    {editActivities.map((act) => (
                                        <ListItem key={act.id} alignItems="flex-start" secondaryAction={
                                            <IconButton edge="end" onClick={() => handleDeleteActivity(act.id)}><DeleteIcon /></IconButton>
                                        }>
                                            <Box sx={{ width: '100%' }}>
                                                <Select
                                                    value={act.type}
                                                    onChange={e => handleEditActivity(act.id, 'type', e.target.value)}
                                                    size="small"
                                                    sx={{ minWidth: 120, mb: 1 }}
                                                >
                                                    <MenuItem value="call">Call</MenuItem>
                                                    <MenuItem value="email">Email</MenuItem>
                                                    <MenuItem value="meeting">Meeting</MenuItem>
                                                    <MenuItem value="note">Note</MenuItem>
                                                </Select>
                                                <TextField
                                                    value={act.title}
                                                    onChange={e => handleEditActivity(act.id, 'title', e.target.value)}
                                                    label="Title"
                                                    fullWidth
                                                    size="small"
                                                    sx={{ mb: 1 }}
                                                />
                                                <TextField
                                                    value={act.description}
                                                    onChange={e => handleEditActivity(act.id, 'description', e.target.value)}
                                                    label="Description"
                                                    fullWidth
                                                    size="small"
                                                    multiline
                                                    minRows={2}
                                                />
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                                <Button variant="outlined" onClick={handleAddActivity} sx={{ mt: 2 }}>Thêm activity</Button>
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

export default Interactions; 