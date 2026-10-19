import * as Crypto from 'expo-crypto';

// Mantido aqui por compatibilidade com o app do passageiro.
export { isValidEmail, normalizeEmail } from '@/core/domain/auth/email';

const PASSWORD_ITERATIONS = 1000;

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function createPasswordMaterial(password: string) {
  const salt = bytesToHex(Crypto.getRandomBytes(16));
  const passwordHash = await derivePassword(password, salt, PASSWORD_ITERATIONS);

  return { passwordSalt: salt, passwordHash, passwordIterations: PASSWORD_ITERATIONS };
}

export async function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string,
  iterations: number,
) {
  return (await derivePassword(password, salt, iterations)) === expectedHash;
}

async function derivePassword(password: string, salt: string, iterations: number) {
  let value = `${salt}:${password}`;

  for (let iteration = 0; iteration < iterations; iteration += 1) {
    value = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
  }

  return value;
}