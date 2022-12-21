import { JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../../../config";
import { IUUID } from "../../../shared/util/uuid/uuid";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { User } from "../../domain/user";
import { IAuthService } from "./auth-service";

export class MemoryAuthService implements IAuthService {
  private memory: { [key: string]: any } = {};

  constructor(private readonly uuid: IUUID) {}

  signJWT(payload: object | string): JWTToken {
    return sign(payload, config.jwt.key, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyJWT(token: JWTToken): string | JwtPayload | undefined {
    try {
      return verify(token, config.jwt.key);
    } catch (error) {
      return undefined;
    }
  }

  createRefreshToken(): RefreshToken {
    return this.uuid.generate() as RefreshToken;
  }

  async saveAuthenticatedUser(user: User): Promise<void> {
    this.memory[`refresh-${user.refreshToken}-${user.email}`] =
      user.accessToken;

    return Promise.resolve();
  }

  async getTokens(email: User["email"]): Promise<string[]> {
    const keys = Object.keys(this.memory).filter((key) => key.includes(email));

    return Promise.resolve(keys.map((key) => this.memory[key]));
  }

  async logout(email: User["email"]): Promise<void> {
    const keys = Object.keys(this.memory).filter((key) => key.includes(email));

    keys.forEach((key) => {
      this.memory[key] = undefined;
    });

    return Promise.resolve();
  }
}
