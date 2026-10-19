import type { UserSession } from '@/core/domain/auth/session.types';

export interface SessionRepository {
  getCurrentSession(): Promise<UserSession | null>;
  saveSession(session: UserSession): Promise<void>;
  clearSession(): Promise<void>;
}