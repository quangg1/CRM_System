import apiService, { ApiResponse } from './api';

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

export interface CustomerStats {
    total: number;
    leads: number;
    customers: number;
    inactive: number;
}

export interface CreateCustomerData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status?: 'lead' | 'customer' | 'inactive';
    notes?: string;
}

export interface UpdateCustomerData extends CreateCustomerData { }

export interface CustomerProduct {
    id: string;
    customer_id: string;
    product_id: string;
    status: string;
    product_name: string;
    product_status: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    price?: number;
    category?: string;
    status: string;
    created_at: string;
    updated_at: string;
}

class CustomerService {
    // Get all customers
    async getAll(): Promise<Customer[]> {
        const response = await apiService.get<Customer[]>('/customers');
        return response.data || [];
    }

    // Get customer by ID
    async getById(id: string): Promise<Customer> {
        const response = await apiService.get<Customer>(`/customers/${id}`);
        return response.data!;
    }

    // Get customers by status
    async getByStatus(status: string): Promise<Customer[]> {
        const response = await apiService.get<Customer[]>(`/customers/status/${status}`);
        return response.data || [];
    }

    // Create new customer
    async create(customerData: CreateCustomerData): Promise<Customer> {
        const response = await apiService.post<Customer>('/customers', customerData);
        return response.data!;
    }

    // Update customer
    async update(id: string, customerData: UpdateCustomerData): Promise<Customer> {
        const response = await apiService.put<Customer>(`/customers/${id}`, customerData);
        return response.data!;
    }

    // Delete customer
    async delete(id: string): Promise<void> {
        await apiService.delete(`/customers/${id}`);
    }

    // Search customers
    async search(query: string): Promise<Customer[]> {
        const response = await apiService.get<Customer[]>(`/customers/search?q=${encodeURIComponent(query)}`);
        return response.data || [];
    }

    // Search customers by name only
    async searchByName(name: string): Promise<Customer[]> {
        const response = await apiService.get<Customer[]>(`/customers/search/name?name=${encodeURIComponent(name)}`);
        return response.data || [];
    }

    // Get customer statistics
    async getStats(): Promise<CustomerStats> {
        const response = await apiService.get<CustomerStats>('/customers/stats');
        return response.data!;
    }

    // Get products of a customer
    async getCustomerProducts(customerId: string): Promise<CustomerProduct[]> {
        const response = await apiService.get<CustomerProduct[]>(`/customerProducts/customer/${customerId}`);
        return response.data || [];
    }

    // Get all products
    async getAllProducts(): Promise<Product[]> {
        const response = await apiService.get<Product[]>('/products');
        return response.data || [];
    }

    // Add customer product
    async addCustomerProduct(data: { customer_id: string; product_id: string; status: string }): Promise<CustomerProduct> {
        const response = await apiService.post<CustomerProduct>('/customerProducts', data);
        return response.data!;
    }

    // Update customer product
    async updateCustomerProduct(id: string, data: { status: string }): Promise<CustomerProduct> {
        const response = await apiService.put<CustomerProduct>(`/customerProducts/${id}`, data);
        return response.data!;
    }

    // Delete customer product
    async deleteCustomerProduct(id: string): Promise<void> {
        await apiService.delete(`/customerProducts/${id}`);
    }

    // Get product by id
    async getProductById(id: string): Promise<Product | null> {
        const response = await apiService.get<Product>(`/products/${id}`);
        return response.data || null;
    }
}

export const customerService = new CustomerService();
export default customerService; 