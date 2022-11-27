import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { Path, STORAGE_NAME } from 'src/app/app.constants';
import { LocalStorageService, StorageUser } from '@core/services/localstorage.service';
import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$$ = this.isLoggedIn$.pipe();

  private currentUserName$ = new BehaviorSubject<string>('Your name');
  currentUserName$$ = this.currentUserName$.pipe();

  accessToken!: string;

  set accestoken(val: string) {
    this.accessToken = val;
  }

  get accestoken() {
    return this.accessToken;
  }

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) {
    this.getToken();
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
          this.accestoken = access_token;
          return this.getUsers();
        }),
        tap(async (users: UserInfo[] | undefined) => {
          if (users) {
            const { name } = users.find((user: { login: string }) => user.login === login)!;
            this.setStorage(this.accestoken, name);
            this.router.navigate([Path.adminPage]);
          }
        })
      );
  }

  async getToken() {
    const { token, name } = (await this.storageService.loadFromLocalStorage(
      STORAGE_NAME
    )) as StorageUser;
    this.isLoggedIn$.next(!!token);
    let currentName = name || 'Your name';
    this.currentUserName$.next(currentName);
    this.accestoken = token;
    return token;
  }

  setStorage(token: string, name: string): void {
    this.storageService.setStorageData({ token, name }, STORAGE_NAME);
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/user`);
  }

  async logout() {
    this.storageService.removeStorage(STORAGE_NAME);
    this.router.navigate([Path.signupPage]);
    await this.getToken();
  }
}
