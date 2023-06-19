import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  LoginMiddleware.login,
  (req: Request, res: Response) =>
    loginController.login(req, res),
);

router.get(
  '/role',
  LoginMiddleware.token,
  (req: Request, res: Response) =>
    loginController.role(req, res),
);

export default router;
