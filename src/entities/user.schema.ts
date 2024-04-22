import Joi from 'joi';
import { type UserCreateDto } from './user';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  birthDate: Joi.string().required(),
});

export const userUpdateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  birthDate: Joi.string(),
});
