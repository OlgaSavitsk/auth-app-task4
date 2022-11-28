import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header.component';
import { UserControlService } from '@core/services/user-control.service';
import { UserInfo } from '@shared/models/user.interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  currentName!: string;

  constructor(public authService: AuthService, private userControlService: UserControlService) {}

  ngOnInit() {
    this.authService.currentUserName$$.subscribe((name) => (this.currentName = name));
  }

  @HostListener('document: click', ['$event'])
  async onClick(event: any) {
    (await this.authService.getToken()) &&
      this.authService.getUsers().subscribe((users: UserInfo[]) => {
        const blockedUser = this.userControlService.serchBlockedUser(users, this.currentName);
        const deletedUser = this.userControlService.searchDeletedUser(users, this.currentName);
        (blockedUser.length > 0 || !deletedUser) && this.authService.logout();
      });
  }
}
