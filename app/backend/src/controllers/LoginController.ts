import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(_req: Request, res: Response) {
    const { email, password } = _req.body;
    const serviceResponse = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async role(_req: Request, res: Response) {
    const { authorization } = _req.headers;

    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    const serviceResponse = await this.loginService.role(authorization);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
