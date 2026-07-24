import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  searchQuery: string;
  isSearchOpen: boolean;
  isLoading: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isMobileMenuOpen: false,
  searchQuery: '',
  isSearchOpen: false,
  isLoading: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setSearchQuery: (query) =>
    set({ searchQuery: query }),

  setSearchOpen: (open) =>
    set({ isSearchOpen: open }),

  setLoading: (loading) =>
    set({ isLoading: loading }),
}));
