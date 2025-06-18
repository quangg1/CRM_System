const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message: string;
}

class ApiService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        console.log('API Service initialized with base URL:', this.baseURL);
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        const finalOptions = {
            ...defaultOptions,
            ...options,
        };

        console.log('Making API request:', {
            url,
            method: finalOptions.method || 'GET',
            body: finalOptions.body,
            headers: finalOptions.headers
        });

        try {
            const response = await fetch(url, finalOptions);
            console.log('API response status:', response.status);
            console.log('API response headers:', Object.fromEntries(response.headers.entries()));

            const data = await response.json();
            console.log('API response data:', data);

            if (!response.ok) {
                console.error('API request failed with status:', response.status);
                console.error('API error response:', data);
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // GET request
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    // POST request
    async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // PUT request
    async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // DELETE request
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService; 