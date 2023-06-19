import * as Bcrypt from 'bcryptjs';
import { IEncrypter } from '../Interfaces/IEncrypter';

export default class EncryptBcrypt implements IEncrypter {
  private bcrypt = Bcrypt;

  async encrypt(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await this.bcrypt.compare(password, hash);
    return isValid;
  }
}
