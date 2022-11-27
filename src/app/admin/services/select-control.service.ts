import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { UserDetails, UserInfo } from '@shared/models/user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectControlService {
  userDetails: UserDetails = {
    users: [],
    completed: false,
  };
  allComplete: boolean = false;
  checkedUsers: UserInfo[] = [];
  userState$!: Observable<UserInfo[]>;

  constructor(public authService: AuthService) {}

  updateAllComplete(): void {
    this.allComplete =
      this.userDetails.users != null && this.userDetails.users.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.userDetails.users == null) {
      return false;
    }
    this.checkedUsers = this.userDetails.users.filter((t) => t.completed);
    return this.checkedUsers.length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    if (this.userDetails.users == null) {
      return;
    }
    this.userDetails.users.forEach((user) => (user.completed = completed));
  }
}
