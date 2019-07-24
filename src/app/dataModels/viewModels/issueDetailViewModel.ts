import { EquipmentAttachmentViewModel } from './equipmentAttachmentViewModel';
import { IssueDetailCommentViewModel } from './issueDetailCommentViewModel';
import { IssueDetailAttachmentViewModel } from './issueDetailAttachmentViewModel';

export class IssueDetailViewModel {
  issueDetailId: number;
  issueId: number;
  userId: string;
  userName: string;
  caption: string;
  text: string;
  creationDate?: string;
  lastUpdateDate?: string;
  answerUseful: number;
  isCorrectAnswer: boolean;
  likes?: number;
  issueDetailAttachments = new Array<IssueDetailAttachmentViewModel>();
  issueDetailComments = new Array<IssueDetailCommentViewModel>();
  equipmentAttachmentViewModels = new Array<EquipmentAttachmentViewModel>();
}
