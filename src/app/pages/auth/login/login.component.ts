import { Component } from '@angular/core';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { log } from 'node:console';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  email!: string;
  password!: string;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {}
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Logged in');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Failed to log in');
        this.router.navigate(['auth/error']);
      },
    });
  }
}
