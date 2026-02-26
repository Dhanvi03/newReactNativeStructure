// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { AuthModel } from '@src/types/models/auth.model';

interface AuthState {
  // ─── State ───────────────────────────────────
  user: AuthModel | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // ─── Actions ─────────────────────────────────
  setAuth: (data: AuthModel) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // ─── Initial State ──────────────────────
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      // ─── Set after login ────────────────────
      setAuth: (data: AuthModel) => {
        set({
          user: data,
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        });
      },

      // ─── Clear on logout ────────────────────
      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'app-auth-storage',                        // MMKV key name
      storage: createJSONStorage(() => zustandStorage), // persist to disk
      onRehydrateStorage: () => (state) => {
        // After app restart — re-validate token exists
        if (state && !state.token) {
          state.isAuthenticated = false;
        }
      },
    }
  )
);