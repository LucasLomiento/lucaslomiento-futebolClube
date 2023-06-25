import * as jwt from 'jsonwebtoken';
import IHandleToken from '../Interfaces/IHandleToken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  id: number,
  email: string,
  role: string,
};

export default class HandleToken implements IHandleToken {
  private tokenGenerator = jwt;

  sign(payload: TokenPayload): string {
    const token = this.tokenGenerator.sign(payload, secret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  }

  verify(token: string): TokenPayload {
    const data = this.tokenGenerator.verify(token, secret) as TokenPayload;
    return data;
  }
}
