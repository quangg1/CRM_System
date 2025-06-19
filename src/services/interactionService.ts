import apiService, { ApiResponse } from './api';
import { Interaction } from '../types';

export interface InteractionStats {
    total: number;
    scheduled: number;
    completed: number;
    cancelled: number;
    calls: number;
    emails: number;
    meetings: number;
    notes: number;
}

export interface CreateInteractionData {
    customer_id: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    description: string;
    date: string;
    status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface UpdateInteractionData extends CreateInteractionData { }

export interface Activity {
    id: string;
    interaction_id: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

class InteractionService {
    // Get all interactions
    async getAll(): Promise<Interaction[]> {
        const response = await apiService.get<Interaction[]>('/interactions');
        return response.data || [];
    }

    // Get interaction by ID
    async getById(id: string): Promise<Interaction> {
        const response = await apiService.get<Interaction>(`/interactions/${id}`);
        return response.data!;
    }

    // Get interactions by customer ID
    async getByCustomerId(customerId: string): Promise<Interaction[]> {
        const response = await apiService.get<Interaction[]>(`/interactions/customer/${customerId}`);
        return response.data || [];
    }

    // Get interactions by type
    async getByType(type: string): Promise<Interaction[]> {
        const response = await apiService.get<Interaction[]>(`/interactions/type/${type}`);
        return response.data || [];
    }

    // Get interactions by status
    async getByStatus(status: string): Promise<Interaction[]> {
        const response = await apiService.get<Interaction[]>(`/interactions/status/${status}`);
        return response.data || [];
    }

    // Create new interaction
    async create(interactionData: CreateInteractionData): Promise<Interaction> {
        const response = await apiService.post<Interaction>('/interactions', interactionData);
        return response.data!;
    }

    // Update interaction
    async update(id: string, interactionData: UpdateInteractionData): Promise<Interaction> {
        const response = await apiService.put<Interaction>(`/interactions/${id}`, interactionData);
        return response.data!;
    }

    // Delete interaction
    async delete(id: string): Promise<void> {
        await apiService.delete(`/interactions/${id}`);
    }

    // Get upcoming interactions
    async getUpcoming(): Promise<Interaction[]> {
        const response = await apiService.get<Interaction[]>('/interactions/upcoming');
        return response.data || [];
    }

    // Get interaction statistics
    async getStats(): Promise<InteractionStats> {
        const response = await apiService.get<InteractionStats>('/interactions/stats');
        return response.data!;
    }

    // Get activities of an interaction
    async getActivities(interactionId: string): Promise<Activity[]> {
        const response = await apiService.get<Activity[]>(`/interactions/${interactionId}/activities`);
        return response.data || [];
    }

    // Add activity
    async addActivity(data: { interaction_id: string; type: string; title: string; description: string }): Promise<Activity> {
        const response = await apiService.post<Activity>('/activities', data);
        return response.data!;
    }

    // Update activity
    async updateActivity(id: string, data: { type: string; title: string; description: string }): Promise<Activity> {
        const response = await apiService.put<Activity>(`/activities/${id}`, data);
        return response.data!;
    }

    // Delete activity
    async deleteActivity(id: string): Promise<void> {
        await apiService.delete(`/activities/${id}`);
    }
}

export const interactionService = new InteractionService();
export default interactionService; 