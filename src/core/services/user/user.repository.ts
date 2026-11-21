import type { UserProfile } from '@/core/domain/user/user.types';
import { asyncStorageAdapter } from '@/core/storage/async-storage.adapter';
import { StorageKeys } from '@/core/storage/storage.keys';

export interface UserRepository {
  getByUserId(userId: string): Promise<UserProfile | null>;
  saveProfile(profile: UserProfile): Promise<void>;
  updateProfile(profile: UserProfile): Promise<void>;
  deleteProfile(userId: string): Promise<void>;
  clearAll(): Promise<void>;
}

export const userRepository: UserRepository = {
  async getByUserId(userId: string) {
    const profiles = (await asyncStorageAdapter.get<UserProfile[]>(StorageKeys.profiles)) ?? [];
    return profiles.find((profile) => profile.userId === userId) ?? null;
  },

  async saveProfile(profile) {
    const profiles = (await asyncStorageAdapter.get<UserProfile[]>(StorageKeys.profiles)) ?? [];
    await asyncStorageAdapter.set(StorageKeys.profiles, [...profiles, profile]);
  },

  async updateProfile(profile) {
    const profiles = (await asyncStorageAdapter.get<UserProfile[]>(StorageKeys.profiles)) ?? [];
    await asyncStorageAdapter.set(
      StorageKeys.profiles,
      profiles.map((storedProfile) =>
        storedProfile.userId === profile.userId ? profile : storedProfile,
      ),
    );
  },

  async deleteProfile(userId) {
    const profiles = (await asyncStorageAdapter.get<UserProfile[]>(StorageKeys.profiles)) ?? [];
    await asyncStorageAdapter.set(
      StorageKeys.profiles,
      profiles.filter((profile) => profile.userId !== userId),
    );
  },

  clearAll() {
    return asyncStorageAdapter.remove(StorageKeys.profiles);
  },
};