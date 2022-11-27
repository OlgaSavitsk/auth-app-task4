import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserControlService {
  private blockStatus$$ = new BehaviorSubject<string>('active');
  public blockStatus$ = this.blockStatus$$.pipe();

  private isDeleted$$ = new BehaviorSubject<boolean>(false);
  public isDeleted$ = this.isDeleted$$.pipe();

  blockUser(value: string) {
    this.blockStatus$$.next(value);
  }

  deleteUser(val: boolean) {
    this.isDeleted$$.next(val);
  }
}
