import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class EncryptionService {
  private secretKey: string = 'your-secret-key';

  private generateKey(): CryptoJS.lib.WordArray {
    return CryptoJS.PBKDF2(this.secretKey, CryptoJS.lib.WordArray.random(16), {
      keySize: 256 / 32,
      iterations: 1000
    });
  }

  encrypt(text: string): string {
    const key = this.generateKey();
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.Pkcs7
    });

    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Hex) + ':' + key.toString(CryptoJS.enc.Hex);
  }
}
