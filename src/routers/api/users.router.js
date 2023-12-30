import { Router } from 'express';
import passport from 'passport';
import UsersController from '../../controllers/user.controller.js';
import { authPolicies } from '../../utils.js';

const router = Router();

// Middleware de autenticación para proteger las rutas
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', authPolicies(['admin']), async (req, res, next) => {
  try {
    const users = await UsersController.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:uid', authPolicies(['admin', 'user']), async (req, res, next) => {
  try {
    const { params: { uid } } = req;
    const user = await UsersController.getById(uid);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', authPolicies(['admin']), async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UsersController.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:uid', authPolicies(['admin', 'user']), async (req, res, next) => {
  try {
    const { params: { uid }, body } = req;
    await UsersController.updateById(uid, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
