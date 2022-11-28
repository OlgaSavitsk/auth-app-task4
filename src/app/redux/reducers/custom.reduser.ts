import { createReducer, on } from '@ngrx/store';

import { loadUsers, loadUsersFailure, loadusersSuccess } from '../actions/custom.actions';
import { initialCustomState } from '../state/custom.state';

export const customReduser = createReducer(
  initialCustomState,
  on(loadUsers, (state) => ({
    ...state,
  })),
  on(loadusersSuccess, (state, { payload: items }) => ({
    ...state,
    users: items,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
