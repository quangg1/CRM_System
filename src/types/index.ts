export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'lead' | 'customer' | 'inactive';
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface Interaction {
    id: string;
    customerId: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    description: string;
    date: string;
    status: 'completed' | 'scheduled' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'sales' | 'support';
    avatar?: string;
} 