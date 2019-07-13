import { EquipmentViewModel } from './equipmentViewModel';
import { IssueType } from './../enums/issueType';

export class IssueViewModel {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  lastUpdateDate: string;
  fileId: string;
  answerCount?: number;
  isActive?: boolean;
  issueType: IssueType;
  sumLikes?: number;
  userId: string;
  userName: string;
  equipments = new Array<EquipmentViewModel>();
}
