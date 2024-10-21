import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private localStorage: LocalStorageService) {}

  getToken(): string | null {
    debugger
    const token = this.localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode.jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return token; // Return the token itself
        }
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
    return null; // Return null if token is not valid or doesn't exist
  }
}
