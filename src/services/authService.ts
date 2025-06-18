import { User } from '../types';
import { apiService } from './api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    company?: string;
}

class AuthService {
    private readonly USER_KEY = 'user';
    private readonly TOKEN_KEY = 'token';

    // Get current user from localStorage
    getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem(this.USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return this.getCurrentUser() !== null;
    }

  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiService.post<{ user: User; token: string }>('/auth/login', credentials);
      
      if (response.success && response.data) {
        // Store user and token
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
        localStorage.setItem(this.TOKEN_KEY, response.data.token);
        return response.data.user;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // Register user
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await apiService.post<{ user: User; token: string }>('/auth/register', data);
      
      if (response.success && response.data) {
        // Store user and token
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
        localStorage.setItem(this.TOKEN_KEY, response.data.token);
        return response.data.user;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }
  // Logout user
  async logout(): Promise<void> {
    // Store current token before removing it
    const currentToken = this.getToken();
    
    // Remove user and token from localStorage first
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    
    // Call logout API only if we have a token
    if (currentToken) {
      try {
        await apiService.post('/auth/logout');
        console.log('✅ Logout API call successful');
      } catch (error) {
        // Ignore logout API errors - user is already logged out locally
        console.warn('⚠️ Logout API call failed (this is usually not critical):', error);
      }
    } else {
      console.log('ℹ️ No token found, skipping logout API call');
    }
  }

    // Get auth token
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }    // Update user profile
    async updateProfile(userData: Partial<User>): Promise<User> {
        try {
            const response = await apiService.put<{ user: User }>('/auth/profile', userData);
            
            if (response.success && response.data) {
                // Update localStorage with new user data
                localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
                return response.data.user;
            } else {
                throw new Error(response.message || 'Profile update failed');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Profile update failed');
        }
    }

    // Change password
    async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
        try {
            const response = await apiService.put('/auth/change-password', data);
            
            if (!response.success) {
                throw new Error(response.message || 'Password change failed');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Password change failed');
        }
    }

    // Reset password
    async resetPassword(email: string): Promise<void> {
        try {
            // Real implementation would be:
            // await apiService.post('/auth/reset-password', { email });
            
            // For demo, just simulate success
            console.log('Password reset email sent');
        } catch (error) {
            throw new Error('Password reset failed');
        }
    }
}

export const authService = new AuthService();
export default authService;
