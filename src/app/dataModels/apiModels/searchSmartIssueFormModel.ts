import { FilterType } from './../enums/filterType';
import { SortType } from '../enums/sortType';

export class SearchSmartIssueFormModel {
  searchContent: string;
  userId?: string;
  equipmentIds = new Array<number>();
  filterType?: FilterType;
  sortType?: SortType;
  pageIndex = 1;
  pageSize = 15;
}
