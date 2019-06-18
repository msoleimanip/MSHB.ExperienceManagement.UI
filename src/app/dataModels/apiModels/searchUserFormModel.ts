import { SearchModel } from './../generalModels/searchModel';

export class SearchUserFormModel extends SearchModel {
  username = '';
  firstName = '';
  lastName = '';
  location = '';
  phoneNumber = '';
  isActive?: boolean = null;
}
