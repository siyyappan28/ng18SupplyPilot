import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss'
})
export class TopBannerComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Input() userName = 'John Doe';
  @Input() userImage = 'assets/image/user.png';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    console.log('Logging out...');
  }
}
