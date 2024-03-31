// forgot-password.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  email: string = '';
  mobile: string = '';
  errorMessage: string = '';
  newPassword: string = '';

  backgroundImageUrl = 'assets/image/arrangement-black-friday-shopping-carts-with-copy-space.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.resetPassword(this.username, this.email, this.mobile)
      .subscribe(
        (password) => { // Receive the password directly
          this.newPassword = password;
          this.router.navigate(['/acknowledgment', password]); // Navigate to acknowledgment page with the password
        },
        (error) => {
          console.error('An error occurred:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }
}
