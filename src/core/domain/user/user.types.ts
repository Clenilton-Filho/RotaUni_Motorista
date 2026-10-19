export type UserProfile = {
  userId: string;
  name: string;
  university: string;
  campus: string;
  createdAt: string;
};

export type CreateUserInput = Pick<UserProfile, 'name' | 'university' | 'campus'>;