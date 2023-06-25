import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

import HandleToken from '../auth/HandleToken';

import { IEncrypter } from '../Interfaces/IEncrypter';
import EncryptBcrypt from '../auth/EncryptBcrypt';

export default class LoginService {
  constructor(
    private loginModel: IUsersModel = new UserModel(),
    private encrypter: IEncrypter = new EncryptBcrypt(),
    private handleToken = new HandleToken(),
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

    const token = this.handleToken.sign({
      id: loginResponse.id,
      email: loginResponse.email,
      role: loginResponse.role,
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async role(token: string): Promise<ServiceResponse<{ role: string }>> {
    const { id } = this.handleToken.verify(token);

    const user = await this.loginModel.findById(id) as IUser;

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
