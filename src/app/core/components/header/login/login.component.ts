import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { MaterialModule } from '@shared/modules/material/material.module';
import { UserControlService } from 'src/app/admin/services/user-control.service';

import { /* defaultUserName */ BlockStatus, Path } from 'src/app/app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  @Input() username: string | undefined;

  isDeleted: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userControlService: UserControlService
  ) {}

  onBlock() {
    this.userControlService.blockUser(BlockStatus.blocked);
  }

  onUnBlock() {
    this.userControlService.blockUser(BlockStatus.active);
  }

  onDelete() {
    this.userControlService.deleteUser(!this.isDeleted);
  }

  logOut(): void {
    this.router.navigate([Path.loginPage]);
    this.authService.logout();
    this.username = '';
    //this.username = defaultUserName;
  }
}
