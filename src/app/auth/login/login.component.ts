import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  backgroundImageUrl = 'assets/image/arrangement-black-friday-shopping-carts-with-copy-space.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Check if username and password are provided
    if (!this.username || !this.password) {
      this.error = 'Please provide both username and password';
      return;
    }
  
    // Attempt to login with provided credentials
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          // Navigate to dashboard on successful login
          this.router.navigate(['/dashboard'],  { queryParams: { username: this.username } });
        },
        (error) => {
          // Handle login error
          this.error = error.message || 'Invalid username or password';
        }
      );
  }

  forgotPassword() {
    // Redirect to the forgot password page
    this.router.navigate(['/forgot-password']);
  }
  
}
