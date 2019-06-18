export class User {
  id: string;
  displayName: string;
  name: string;
  family: string;
  isAdmin: boolean;
  role: Array<string>;
  token?: string;
  fullName: string;
}
