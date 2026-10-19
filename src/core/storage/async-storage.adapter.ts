import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StorageAdapter } from './storage.adapter';

export const asyncStorageAdapter: StorageAdapter = {
  async get<T>(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value === null ? null : (JSON.parse(value) as T);
  },

  async set<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};