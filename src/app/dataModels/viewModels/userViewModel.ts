import { PresidentType } from '../enums/presidentType';

export class UserViewModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  phoneNumber: string;
  isActive: boolean;
  isPresident?: PresidentType;
  groupAuthId?: number;
  organizationId?: number;
  userConfigurationId?: number;
  lastLockoutDate?: Date;
  lastPasswordChangedDate?: Date;
  creationDate?: Date;
  lastVisit?: Date;
  lastLoggedIn?: Date;
}
