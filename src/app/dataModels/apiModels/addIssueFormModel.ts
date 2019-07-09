import { IssueType } from 'src/app/dataModels/enums/issueType';

export class AddIssueFormModel {
  title: string;
  description: string;
  imageId: string;
  issueType: IssueType;
  userId: string;
  equipmentIds: Array<number>;
}
