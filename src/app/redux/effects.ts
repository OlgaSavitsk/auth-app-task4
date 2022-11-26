import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '@core/services/user-api.service';
import { UserInfo } from '@shared/models/user.interfaces';
import * as UserActions from '../redux/actions/custom.actions';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: UserInfo[]) => UserActions.loadusersSuccess({ payload: users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserApiService) {}
}
