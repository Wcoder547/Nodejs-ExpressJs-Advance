import bcrypt from "bcryptjs";
import argon2 from "argon2";

async function hashWithBcrypt(password) {
  return await bcrypt.hash(password, 10); // return is required
}

async function verifyWithBcrypt(password, hash) {
  return await bcrypt.compare(password, hash); // return is required
}

async function hashWithArgon2(password) {
  return await argon2.hash(password); // return is required
}

async function verifyWithArgon2(password, hash) {
  return await argon2.verify(hash, password); // return is required
}

const password1 = Array.from({ length: 73 }).fill("a").join("");
const password2 = Array.from({ length: 73 }).fill("a").join("");

const hash1 = await hashWithBcrypt(password1);
const hash2 = await hashWithArgon2(password2);

console.log("Hash 1 (bcrypt): " + hash1);
console.log("Hash 2 (Argon2): " + hash2);

console.log("1 - 1 " + (await verifyWithBcrypt(password1, hash1))); // true
console.log("2 - 2 " + (await verifyWithArgon2(password2, hash2))); // true
console.log("1 - 2 " + (await verifyWithBcrypt(password2, hash1))); // false
console.log("2 - 1 " + (await verifyWithArgon2(password1, hash2))); // false

//wrong when exceeding 72 characters
//because bcrypt truncates the password to 72 characters
// 1 - 1 true
// 2 - 2 true
// 1 - 2 true
// 2 - 1 true
//that's why bcrypt is not recommended for passwords longer than 72 characters
//we should use Argon2 for longer passwords
