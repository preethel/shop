import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  login(userName: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.backend}/Account/auth/login`, {
        userName,
        password,
      })
      .pipe(
        map((response) => {
          debugger
          if (response.success) {
            this.localStorage.setItem('token', response.Token);
            this.localStorage.setItem('userId', response.Id);
            this.localStorage.setItem('userName', response.Name);
            this.localStorage.setItem('userEmail', response.Email);
          }
        })
      );
  }

  isAuthenticated(): boolean {
    if (this.isBrowser && this.tokenService.getToken()) {
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      this.localStorage.clearItem('token');
      this.localStorage.clearItem('userId');
      this.localStorage.clearItem('userName');
      this.localStorage.clearItem('userEmail');
    }
  }
}
