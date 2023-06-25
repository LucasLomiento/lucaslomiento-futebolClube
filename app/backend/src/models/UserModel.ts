import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, IUserResponse } from '../Interfaces/users/IUser';
import { IUsersModel } from '../Interfaces/users/IUsersModel';

export default class UserModel implements IUsersModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: IUser['id']): Promise<IUserResponse | null> {
    const user = await this.model.findByPk(id);
    return user;
  }
}
