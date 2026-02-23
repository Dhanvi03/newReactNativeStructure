import { create } from 'zustand';

interface UIState {
  isGlobalLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isGlobalLoading: false,
  showLoader: () => set({ isGlobalLoading: true }),
  hideLoader: () => set({ isGlobalLoading: false }),
}));

// Export a non-hook version for use in Services/Axios interceptors
export const uiActions = {
  show: () => useUIStore.getState().showLoader(),
  hide: () => useUIStore.getState().hideLoader(),
};