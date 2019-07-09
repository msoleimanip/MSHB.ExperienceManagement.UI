import { IssueType } from './../enums/issueType';

export class IssueViewModel {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  lastUpdateDate: string;
  fileId: string;
  answerCounts?: number;
  isActive?: boolean;
  issueType: IssueType;
  userId: string;
  userName: string;
  equipmentIds: Array<number>;
}
