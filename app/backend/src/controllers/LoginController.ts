import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(_req: Request, res: Response) {
    const { email, password } = _req.body;

    const serviceResponse:
    ServiceResponse<{ token:string }> = await this.loginService.login(email, password);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async role(_req: Request, res: Response) {
    const token = _req.headers.authorization as string;

    const serviceResponse = await this.loginService.role(token);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
