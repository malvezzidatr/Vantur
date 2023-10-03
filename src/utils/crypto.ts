import * as crypto from 'crypto';

export async function encryptPassword(password: string, salt: string) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash;
}

export async function createRandomSalt(bytes: number, type: BufferEncoding) {
  return crypto.randomBytes(bytes).toString(type);
}
