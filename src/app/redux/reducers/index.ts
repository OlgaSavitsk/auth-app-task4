import { ActionReducerMap } from '@ngrx/store';

import { ICustomState } from '../state/custom.state';
import { customReduser } from './custom.reduser';

export interface AppState {
  users: ICustomState;
}

export const reducer: ActionReducerMap<AppState> = {
  users: customReduser,
};
