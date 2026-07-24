import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserDto } from '@/lib/types';

interface AuthState {
  user: UserDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: UserDto) => void;
  setUser: (user: UserDto) => void;
  updateUser: (user: Partial<UserDto>) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (accessToken, refreshToken, user) =>
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      setLoading: (loading) =>
        set({ isLoading: loading }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
