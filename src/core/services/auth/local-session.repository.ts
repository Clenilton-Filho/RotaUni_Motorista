import type { UserSession } from '@/core/domain/auth/session.types';
import { asyncStorageAdapter } from '@/core/storage/async-storage.adapter';
import { StorageKeys } from '@/core/storage/storage.keys';

import type { SessionRepository } from './session.repository';

export class LocalSessionRepository implements SessionRepository {
  getCurrentSession() {
    return asyncStorageAdapter.get<UserSession>(StorageKeys.currentSession);
  }

  saveSession(session: UserSession) {
    return asyncStorageAdapter.set(StorageKeys.currentSession, session);
  }

  clearSession() {
    return asyncStorageAdapter.remove(StorageKeys.currentSession);
  }
}

export const sessionRepository: SessionRepository = new LocalSessionRepository();