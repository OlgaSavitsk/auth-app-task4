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
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.userControlService.isDeleted$.subscribe((val: boolean) => {
      val && this.deleteUser();
    });
    this.userControlService.blockStatus$.subscribe((val) => {
      val && this.blockUser(val);
    });
  }

  blockUser(val: string) {
    this.selectControlService.checkedUsers.forEach((user) => {
      if (user.status == val) return;
      if (user.completed) {
        user.status = val;
        this.userService.updateUserStatus(val, user.id).subscribe();
        this.logout();
      }
    });
  }

  deleteUser(): void {
    this.selectControlService.checkedUsers.forEach(async (user) => {
      this.userService.deleteUser(user.id).subscribe();
      this.userControlService.deleteUser(false);
      this.setUserState(user.id);
      this.authService.currentUserName$$.subscribe(async (name) => {
        if (user.name !== name) return;
      });
      this.authService.logout();
    });
  }

  setUserState(id: string) {
    this.userState = this.selectControlService.userDetails.users.filter((user) => user.id !== id);
    this.selectControlService.userDetails.users = this.userState;
  }

  logout(): void {
    this.selectControlService.userDetails.users.forEach(async (user) => {
      await this.authService.currentUserName$$.subscribe((name) => {
        console.log(name);
        if (user.name === name) {
          this.authService.logout();
        }
        return;
      });
    });
  }

  public async getAllUsers(): Promise<void> {
    await this.authService.getUsers().subscribe((users: UserInfo[]) => {
      this.selectControlService.userDetails.users = users;
      this.selectControlService.userDetails.users.forEach((user) => (user.completed = false));
    });
  }
}
