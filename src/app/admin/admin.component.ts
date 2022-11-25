import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/modules/material/material.module';
import { AuthService } from '@auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails, UserInfo } from '@shared/models/user.interfaces';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserControlService } from './services/user-control.service';
import { take } from 'rxjs';
import { UserApiService } from '@core/services/user/user-api.service';

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
  formGroup!: FormGroup;
  blockInit!: boolean;
  displayedColumns: string[] = [
    'check',
    'position',
    'name',
    'email',
    'registration',
    'login',
    'status',
  ];
  userDetails: UserDetails = {
    users: [],
    completed: false,
  };

  allComplete: boolean = false;
  checkedUsers: UserInfo[] = [];

  constructor(
    private authService: AuthService,
    private userControlService: UserControlService,
    private userService: UserApiService
  ) {
    this.getAllUsers();
  }

  ngOnInit() {
    this.authService.initData();
    this.getAllUsers();
    this.userControlService.blockStatus$.subscribe((val) => {
      if (val) {
        this.checkedUsers.forEach((user) => {
          if (user.status == val) return;
          if (user.completed) {
            user.status = val;

            this.authService.updateUserStatus(val, user.id).subscribe();
          }
        });
      }
    });
    this.userControlService.isDeleted$.subscribe((val) => {
      if (val) {
        this.checkedUsers.forEach((user) => {
          this.userService.deleteUser(user.id).subscribe();
          this.getAllUsers();
        });
      }
    });
  }

  public getAllUsers() {
    this.authService.users$.subscribe((resp: UserInfo[]) => {
      this.userDetails.users = resp;
      this.userDetails.users.forEach((user) => (user.completed = false));
    });
  }

  updateAllComplete() {
    this.allComplete =
      this.userDetails.users != null && this.userDetails.users.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.userDetails.users == null) {
      return false;
    }
    this.checkedUsers = this.userDetails.users.filter((t) => t.completed);
    console.log(this.checkedUsers);
    return this.checkedUsers.length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.userDetails.users == null) {
      return;
    }
    this.userDetails.users.forEach((user) => (user.completed = completed));
  }

  userBlock() {}
}
