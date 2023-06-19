import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, IUserResponse } from '../Interfaces/users/IUser';
import { IUsersModel } from '../Interfaces/users/IUsersModel';

export default class UserModel implements IUsersModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }

  async findById(id: IUser['id']): Promise<IUserResponse | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { username, role, email } = user;
    return { id, username, role, email };
  }
}
