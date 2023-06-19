import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  id: number,
  email: string,
};

export function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
}

export function verifys(token: string): TokenPayload {
  const data = jwt.verify(token, secret) as TokenPayload;

  return data;
}
