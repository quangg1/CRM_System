export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: 'lead' | 'customer' | 'inactive';
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Interaction {
    id: string;
    customer_id: string;
    customer_name: string;
    customer_email: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    description: string;
    date: string;
    status: 'completed' | 'scheduled' | 'cancelled';
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'sales' | 'support';
    company?: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
}