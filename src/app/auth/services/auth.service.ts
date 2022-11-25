import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap, take, tap } from 'rxjs';

import { Path, StorageKeys } from 'src/app/app.constants';
import { LocalStorageService } from '@core/services/localstorage.service';
import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$$ = this.isLoggedIn$.pipe();

  currentUser!: UserInfo;

  get token(): string | undefined {
    return this.storageService.loadFromLocalStorage(StorageKeys.authToken) as string;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) {
    this.isLoggedIn$.next(!!this.token);
  }

  signUp(user: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${environment.BASE_URL}/auth/signup`, user).pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      })
    );
  }

  login({ login, password }: UserAuth): Observable<UserInfo[] | undefined> {
    return this.http
      .post<{ access_token: string }>(`${environment.BASE_URL}/auth/signin`, {
        login,
        password,
      })
      .pipe(
        switchMap(({ access_token }) => {
          this.isLoggedIn$.next(true);
          this.setStorage(access_token);
          this.router.navigate([Path.adminPage]);
          return this.getUsers();
        }),
        tap((users: UserInfo[] | undefined) => {
          if (users) {
            this.currentUser = users.find((user: { login: string }) => user.login === login)!;
          }
        })
      );
  }

  setStorage(token: string): void {
    this.storageService.setStorageData(token, StorageKeys.authToken);
  }

  private users$$ = new BehaviorSubject<UserInfo[]>([]);
  public users$ = this.users$$.pipe();

  initData(): void {
    this.users$ = this.getUsers().pipe(
      take(1),
      tap((items: UserInfo[]) => {
        this.users$$.next(items);
      })
    );
  }

  getUsers(): Observable<UserInfo[]> {
    /*  if (!token) {
      return of(undefined);
    } */
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/user`);
  }

  logout(): void {
    this.storageService.removeStorage(StorageKeys.authToken);
    this.isLoggedIn$.next(false);
  }

  updateUserStatus(status: UserInfo['status'], id: string) {
    return this.http.put<UserInfo>(`${environment.BASE_URL}/user/${id}`, { status });
  }
}
