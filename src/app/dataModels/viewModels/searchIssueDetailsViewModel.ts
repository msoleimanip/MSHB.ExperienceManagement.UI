import { IssueDetailViewModel } from './issueDetailViewModel';
import { IssueViewModel } from 'src/app/dataModels/viewModels/issueViewModel';

export class SearchIssueDetailsViewModel {
  issueViewModel: IssueViewModel;
  issueDetailViewModel = new Array<IssueDetailViewModel>();
}
