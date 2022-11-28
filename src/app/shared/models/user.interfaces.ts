export interface UserAuth {
  name: string;
  login: string;
  password: string;
  status?: string;
}

export interface UserInfo {
  id: string;
  login: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  completed: boolean;
}

export interface UserDetails {
  users: UserInfo[];
  completed: boolean;
}
