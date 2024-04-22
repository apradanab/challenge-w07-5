import { Router as router } from 'express';
import createDebug from 'debug';
import { type UserController } from '../controllers/users.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';

const debug = createDebug('W7:users:router');

export class UsersRouter {
  router = router();
  constructor(
    private readonly controller: UserController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated users router');
    this.router.post('/login', controller.login.bind(controller));
    this.router.post('/register', controller.create.bind(controller));
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
