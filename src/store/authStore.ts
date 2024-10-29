import { create } from 'zustand';
import { AuthState, RegisterData } from '../types/auth';

// Simulated API calls for MVP
const mockLogin = async (email: string, password: string) => {
  return {
    id: '1',
    email,
    name: 'John Doe',
    shopName: 'Street Delights',
    role: 'vendor' as const,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const user = await mockLogin(email, password);
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  register: async (data: RegisterData) => {
    try {
      const user = {
        id: '1',
        ...data,
        role: 'vendor' as const,
      };
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
}));