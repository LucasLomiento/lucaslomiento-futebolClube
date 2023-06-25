import { NextFunction, Request, Response } from 'express';
import HandleToken from '../auth/HandleToken';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginMiddleware {
  private static emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/i;
  private static handleToken = new HandleToken();

  static login(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'All fields must be filled' });
    }

    if (password.length < 6 || !LoginMiddleware.emailRegex.test(email)) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }
    next();
  }

  static token(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    try {
      LoginMiddleware.handleToken.verify(token);
      next();
    } catch (error) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
  }
}
