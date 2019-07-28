import { IssueType } from './../enums/issueType';

export class TotalIssueFormModel {
  startTime: string;
  endTime: string;
  issueType?: IssueType;
}
