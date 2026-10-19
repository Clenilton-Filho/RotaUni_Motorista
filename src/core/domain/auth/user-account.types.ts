export type UserAccount = {
  id: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  passwordIterations: number;
  createdAt: string;
};

export type CreateAccountInput = {
  email: string;
  password: string;
};