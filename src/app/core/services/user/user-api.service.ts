import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UserAuth, UserInfo } from '@shared/models/user.interfaces';
import { Path, StorageKeys } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/user`);
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.BASE_URL}/user/${id}`);
  }

  updateUser(id: string, user: UserAuth): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${environment.BASE_URL}/user/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.BASE_URL}/user/${id}`); /* .pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      })
    ); */
  }
}
