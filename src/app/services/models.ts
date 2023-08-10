export interface SignInRequest {
  username: string;
  password: string;
}

export interface UserData {
  username: null | string;
  displayName: null | string;
  roles: null | string[];
}

export interface TerritoryAPIResponse {
  data: Territory[];
}

export interface Territory {
  id: string;
  name: string;
  parent: string;
}

export interface TerritoryNode {
  id: string;
  name: string;
  parent: string;
  children: TerritoryNode[];
}
