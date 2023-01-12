import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService) {}
  
  login(): void {
    this.authService.login().subscribe();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
