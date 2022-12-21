import { JwtPayload, sign, verify } from "jsonwebtoken";
import { RedisClientType } from "redis";
import { config } from "../../../../config";
import { IUUID } from "../../../../shared/util/uuid/uuid";
import { RefreshToken } from "../../../domain/jwt";
import { User } from "../../../domain/user";
import { IAuthService } from "../auth-service";

export class RedisAuthService implements IAuthService {
  private tokenExpiryTime: number = 604800;
  private hashName: string = "activeClients";

  constructor(
    private readonly client: RedisClientType,
    private readonly uuid: IUUID
  ) {}

  signJWT(payload: string | object): string {
    return sign(payload, config.jwt.key, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyJWT(token: string): string | JwtPayload | undefined {
    try {
      return verify(token, config.jwt.key);
    } catch (error) {
      return undefined;
    }
  }

  createRefreshToken(): string {
    return this.uuid.generate() as RefreshToken;
  }

  async saveAuthenticatedUser(user: User): Promise<void> {
    await this.set(this.buildKey(user), user.accessToken);
  }

  async getTokens(email: string): Promise<string[]> {
    const keys = await this.client.keys(`*${this.hashName}-${email}`);

    const keyValues = await Promise.all(
      keys.map(async (key) => {
        const value = await this.client.get(key);

        return { key, value };
      })
    );

    const notEmptyKeyValues = keyValues.filter((kv) => kv.value !== null);

    if (!notEmptyKeyValues) {
      return [];
    }

    //@ts-ignore
    return notEmptyKeyValues.map((kv) => kv.value);
  }

  async logout(email: string): Promise<void> {
    const keys = await this.client.keys(`*${this.hashName}-${email}`);

    await Promise.all(keys.map((key) => this.client.del(key)));
  }

  private async set(key: string, value: any): Promise<any> {
    const res = await this.client.set(key, value);
    this.client.expire(key, this.tokenExpiryTime);

    return res;
  }

  private buildKey(user: User): string {
    return `refresh-${user.refreshToken}-${this.hashName}-${user.email}`;
  }
}
