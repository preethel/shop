import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private secretKey = 'your-secret-key'; // Replace with your actual secret key

  constructor() {}

  setItem(key: string, value: any): void {
    try {
      const encryptedValue = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        this.secretKey
      ).toString();
      localStorage.setItem(key, encryptedValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getItem(key: string): any {
    try {
      debugger
      const encryptedValue = localStorage.getItem(key);
      if (encryptedValue) {
        const decryptedValue = CryptoJS.AES.decrypt(
          encryptedValue,
          this.secretKey
        ).toString(CryptoJS.enc.Utf8);

        // Ensure the decrypted value is not empty before parsing
        if (decryptedValue) {
          return JSON.parse(decryptedValue);
        } else {
          console.warn(`Decrypted value for key "${key}" is empty or invalid.`);
          return null;
        }
      }
      return null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }

  clearItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing all localStorage', e);
    }
  }
}
