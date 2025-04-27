import { compare, hash } from 'bcrypt';
const saltOrRounds: number = 10;
export async function hashPassword(value: string): Promise<string> {
  return hash(value, saltOrRounds);
}

export async function comparePassword(
  password: string,
  encodedPassword: string,
): Promise<boolean> {
  return compare(password, encodedPassword);
}
