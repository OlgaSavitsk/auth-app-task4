import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserInfo } from '@shared/models/user.interfaces';
import { BlockStatus } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserControlService {
  private blockStatus$$ = new BehaviorSubject<string>('');
  public blockStatus$ = this.blockStatus$$.pipe();

  private isDeleted$$ = new BehaviorSubject<boolean>(false);
  public isDeleted$ = this.isDeleted$$.pipe();

  constructor() {}

  blockUser(value: string) {
    this.blockStatus$$.next(value);
  }

  deleteUser(val: boolean) {
    this.isDeleted$$.next(val);
  }

  serchBlockedUser(users: UserInfo[], currentName: string) {
    const blockedUser = users.filter(
      (user) => user.status === BlockStatus.blocked && user.name === currentName
    );
    return blockedUser;
  }

  searchDeletedUser(users: UserInfo[], currentName: string) {
    const deletedUser = users.find((user) => user.name === currentName);
    return deletedUser;
  }
}
