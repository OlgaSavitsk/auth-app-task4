import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@shared/modules/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { UserInfo } from '@shared/models/user.interfaces';
import { UserControlService } from '../core/services/user-control.service';
import { UserApiService } from '@core/services/user-api.service';
import { SelectControlService } from './services/select-control.service';
import { displayedColumns } from '../app.constants';

export interface Task {
  name: string;
  completed: boolean;
  color: string;
  subtasks?: Task[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns = displayedColumns;
  userState: UserInfo[] = [];

  constructor(
    public authService: AuthService,
    private userControlService: UserControlService,
    private userService: UserApiService,
    public selectControlService: SelectControlService
  ) {
    //this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.authService.getToken();
    this.blockUser();
    this.deleteUser();
  }

  blockUser() {
    this.userControlService.blockStatus$.subscribe((val) => {
      val &&
        this.selectControlService.checkedUsers.forEach((user) => {
          if (user.status == val) return;
          if (user.completed) {
            user.status = val;
            this.userService.updateUserStatus(val, user.id).subscribe();
            this.logout();
          }
        });
    });
  }

  logout(): void {
    this.selectControlService.checkedUsers.forEach((user) => {
      this.authService.currentUserName$$.subscribe((name) => {
        if (user.name === name) {
          this.authService.logout();
        }
        return;
      });
    });
  }

  deleteUser(): void {
    this.userControlService.isDeleted$.subscribe((val: boolean) => {
      val &&
        this.selectControlService.checkedUsers.forEach(async (user) => {
          this.userService.deleteUser(user.id).subscribe();
          this.userControlService.deleteUser(false);
          this.setUserState(user.id);
        });
      this.logout();
    });
  }

  setUserState(id: string) {
    this.userState = this.selectControlService.userDetails.users.filter((user) => user.id !== id);
    this.selectControlService.userDetails.users = this.userState;
  }

  public async getAllUsers(): Promise<void> {
    await this.authService.getUsers().subscribe((users: UserInfo[]) => {
      this.selectControlService.userDetails.users = users;
      this.selectControlService.userDetails.users.forEach((user) => (user.completed = false));
    });
  }
}
