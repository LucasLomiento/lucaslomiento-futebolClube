import { JwtPayload } from 'jsonwebtoken';

export default interface IHandleToken {
  sign(payload: { email: string }): string
  verify(token: string): JwtPayload | string
}
