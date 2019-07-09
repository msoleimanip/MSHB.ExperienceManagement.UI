import { IssueType } from './../enums/issueType';
import { SearchModel } from './../generalModels/searchModel';

export class SearchIssueFormModel extends SearchModel {
  title: string;
  isActive?: boolean;
  issueType?: IssueType;
  userId?: string;
  equipmentIds: Array<number>;
}
