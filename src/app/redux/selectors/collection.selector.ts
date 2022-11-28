import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICustomState } from '../state/custom.state';

export const featureCustomSelector = createFeatureSelector<ICustomState>('users');

export const customSelector = createSelector(
  featureCustomSelector,
  (state: ICustomState) => state.users
);
