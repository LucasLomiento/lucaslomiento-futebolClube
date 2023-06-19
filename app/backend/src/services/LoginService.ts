import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

import { sign, verifys } from '../auth/jwt.util';

import { IEncrypter } from '../Interfaces/IEncrypter';
import EncryptBcrypt from '../auth/EncryptBcrypt';

export default class LoginService {
  constructor(
    private loginModel: IUsersModel = new UserModel(),
    private encrypter: IEncrypter = new EncryptBcrypt(),
  ) {}

  public async login(email: string, password: string)
    : Promise<ServiceResponse<{ token: string }>> {
    const loginResponse: IUser | null = await this.loginModel.findByEmail(email);

    if (!loginResponse) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isValidPassword = await this.encrypter.compare(password, loginResponse.password);

    if (!isValidPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = sign({ id: loginResponse.id, email: loginResponse.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(token: string): Promise<ServiceResponse<{ role: string }>> {
    const { id } = verifys(token);

    const user = await this.loginModel.findById(id);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid token' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
