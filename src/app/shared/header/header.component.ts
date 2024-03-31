import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) { }

  @Output() cartToggle = new EventEmitter<boolean>();

  onCartIconClick(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.router.navigate(['/cart'], { queryParams: { userId: userId } });
    } else {
      console.log('User', userId)
    }
  }

  toggleCart() {
    this.cartToggle.emit(true);
  }
}
