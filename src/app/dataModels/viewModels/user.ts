import { PresidentType } from '../enums/presidentType';

export class User {
  id: string;
  displayName: string;
  name: string;
  family: string;
  isPresident: PresidentType;
  role: Array<string>;
  token?: string;
  fullName: string;
}
