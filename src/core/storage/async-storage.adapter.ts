import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StorageAdapter } from './storage.adapter';

export const asyncStorageAdapter: StorageAdapter = {
  async get<T>(key: string) {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      // Valor corrompido: trata como vazio para o app não travar nesta chave.
      if (__DEV__) console.warn(`[storage] Valor inválido em "${key}", ignorando.`);
      return null;
    }
  },

  async set<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
