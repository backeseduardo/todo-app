export interface IPassword {
  hash(password: string, saltOrRounds: number): Promise<string>;
  compare(str: string, hash: string): Promise<boolean>;
}
