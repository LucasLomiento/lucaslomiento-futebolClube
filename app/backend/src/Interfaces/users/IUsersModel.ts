// import { ICRUDModelReader } from '../ICRUDModel';
import { IUser, IUserResponse } from './IUser';

export interface IUsersModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
  findById(id: IUser['id']): Promise<IUserResponse | null>,
}
