import * as Crypto from 'crypto';
import EncryptionConfig from '../configs/encryption.config';

export function encrypt(text): string {
  const Cipher: Crypto.Cipher = Crypto.createCipheriv(EncryptionConfig.algorithm, EncryptionConfig.password, EncryptionConfig.iv);
  let Encrypted: string = Cipher.update(text, 'utf8', 'base64');
  Encrypted += Cipher.final('base64');
  return Encrypted;
}

export function decrypt(encryptedText: string): string {
  const Decipher: Crypto.Decipher = Crypto.createDecipheriv(EncryptionConfig.algorithm, EncryptionConfig.password, EncryptionConfig.iv);
  let dec = Decipher.update(encryptedText, 'base64', 'utf8');
  dec += Decipher.final('utf8');

  return dec;
}
