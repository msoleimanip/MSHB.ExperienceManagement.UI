export class AddIssueDetailFormModel {
  issueId: number;
  userId: string;
  caption: string;
  text: string;
  uploadFiles: Array<string>;
  equipmentAttachmentIds: Array<number>;
}
