import { JwtPayload } from "jsonwebtoken";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { User } from "../../domain/user";

export interface IAuthService {
  signJWT(payload: object | string): JWTToken;
  verifyJWT(token: JWTToken): string | JwtPayload | undefined;
  createRefreshToken(): RefreshToken;
  saveAuthenticatedUser(user: User): Promise<void>;
  getTokens(email: User["email"]): Promise<string[]>;
  logout(email: User["email"]): Promise<void>;
}
