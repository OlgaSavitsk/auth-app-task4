import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import { UserControlService } from '@core/services/user-control.service';
import { MaterialModule } from '@shared/modules/material/material.module';

import { BlockStatus } from 'src/app/app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  @Input() username: string | undefined;

  isDeleted: boolean = false;

  constructor(public authService: AuthService, private userControlService: UserControlService) {}

  onBlock(): void {
    this.userControlService.blockUser(BlockStatus.blocked);
  }

  onUnBlock(): void {
    this.userControlService.blockUser(BlockStatus.active);
  }

  onDelete(): void {
    this.userControlService.deleteUser(!this.isDeleted);
  }
}
