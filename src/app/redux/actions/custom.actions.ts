import { createAction, props } from '@ngrx/store';
import { UserInfo } from '@shared/models/user.interfaces';

/* export const addCustomItem = createAction(
  '[CUSTOM] add custom item',
  props<{ items: UserInfo[] }>()
); */

export const loadUsers = createAction('[ADMIN PAGE] add users');

export const loadusersSuccess = createAction(
  '[CUSTOM] add custom item',
  props<{ payload: UserInfo[] }>()
);

export const loadUsersFailure = createAction('load users fail', props<{ error: any }>());
