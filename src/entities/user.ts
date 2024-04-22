export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate?: Date;
  role: 'user' | 'admin' | 'guest';
};

export type UserCreateDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate?: Date;
};

export type UserUpdateDto = Partial<UserCreateDto>;
