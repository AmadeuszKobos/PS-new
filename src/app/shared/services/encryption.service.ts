import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private key = 'superSecretKey'

  constructor() { }

  encryptPesel(pesel: string): string  {
    return CryptoJS.AES.encrypt(pesel, this.key).toString();
  }

  decryptPesel(encryptedPesel: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPesel, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
