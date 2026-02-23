import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';
import { logger } from '@src/utils';
import type { STORAGES_KEY } from '@src/constants';

// Single instance for the whole app
export const mmkv = createMMKV();

/**
 * 1. Zustand Persist Bridge
 */
export const zustandStorage: StateStorage = {
  setItem: (name, value) => mmkv.set(name, value),
  getItem: (name) => mmkv.getString(name) ?? null,
  removeItem: (name) => mmkv.remove(name),
};

/**
 * 2. Manual Utility Helpers 
 */
export const storage = {
  setData: (key: STORAGES_KEY, value: any) => {
    try {
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
      mmkv.set(key, stringValue);
    } catch (e) { logger('Storage Set Error', e); }
  },
  getData: <T>(key: STORAGES_KEY): T | null => {
    try {
      const res = mmkv.getString(key);
      return res ? JSON.parse(res) : null;
    } catch (e) { return null; }
  },
  delete: (key: STORAGES_KEY) => mmkv.remove(key),
  clearAll: () => mmkv.clearAll(),
};

