export interface SignInRequest {
  username: string;
  password: string;
}

export interface UserData {
  username: null | string;
  displayName: null | string;
  roles: null | string[];
}
