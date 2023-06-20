import { Request, Response, Router } from 'express';
import MatchesContoller from '../controllers/MatchesController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

const matchesController = new MatchesContoller();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchesController.findAll(req, res));

router.patch(
  '/:id/finish',
  LoginMiddleware.token,
  (req: Request, res: Response) =>
    matchesController.finishById(req, res),
);

router.patch(
  '/:id',
  LoginMiddleware.token,
  (req: Request, res: Response) =>
    matchesController.updateMatch(req, res),
);

router.post(
  '/',
  LoginMiddleware.token,
  (req: Request, res: Response) =>
    matchesController.create(req, res),
);

export default router;
