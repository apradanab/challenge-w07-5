import { type PrismaClient } from '@prisma/client';
import debug from 'debug';
import {
  type User,
  type UserUpdateDto,
  type UserCreateDto,
} from '../entities/user';
import { HttpError } from '../middleware/errors.middleware.js';

const select = {
  id: true,
  name: true,
  email: true,
  password: true,
  birthDate: true,
  role: true,
  followedBy: true,
  following: true,
  hatedBy: true,
  hating: true,
};

export class UserSqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated user repository');
  }

  async findUser(key: string, value: unknown) {
    return this.prisma.user.findMany({
      where: {
        [key]: value,
      },
      select,
    });
  }

  async searchForLogin(key: 'email' | 'name', value: string) {
    if (!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not found', 'Invalid parameters');
    }

    const userData = await this.prisma.user.findFirst({
      where: { [key]: value },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!userData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key} or password`);
    }

    return userData;
  }

  async readAll() {
    return this.prisma.user.findMany({ select });
  }

  async readById(inputId: string) {
    const pet = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!pet) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }

    return pet;
  }

  async create(data: UserCreateDto) {
    const newUser = this.prisma.user.create({
      data: {
        role: 'user',
        ...data,
      },
      select,
    });
    return newUser;
  }

  async update(inputId: string, data: UserUpdateDto) {
    let user: User;
    try {
      user = (await this.prisma.user.update({
        where: { id: inputId },
        data,
        select,
      })) as User;
    } catch (error) {
      throw new HttpError(404, 'Not Found', `User ${inputId}not found`);
    }

    return user;
  }

  async delete(inputId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }

    return this.prisma.user.delete({ where: { id: inputId }, select });
  }
}
