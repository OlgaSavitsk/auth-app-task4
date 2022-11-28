import { UserInfo } from '@shared/models/user.interfaces';

export interface ICustomState {
  users: UserInfo[];
}

export const initialCustomState: ICustomState = {
  users: [],
};
