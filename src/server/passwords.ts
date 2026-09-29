import argon2 from "argon2";

export function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export function verifyPassword(hash: string, password: string): Promise<boolean> {
  return argon2.verify(hash, password).catch(() => false);
}

// A hash of an unguessable, never-used password. Used only so an unknown-email login always
// pays the same argon2.verify cost as a known-email one — otherwise the unknown-email path
// returns near-instantly while the known-email path takes the full hash time, and that timing
// difference is enough to enumerate which emails have accounts even though both return the same
// 401 body. Computed lazily (argon2.hash is itself slow) and cached for the process lifetime.
let dummyHash: Promise<string> | null = null;

export function verifyAgainstDummyHash(password: string): Promise<boolean> {
  dummyHash ??= argon2.hash(crypto.randomUUID() + crypto.randomUUID());
  return dummyHash.then((h) => verifyPassword(h, password));
}
