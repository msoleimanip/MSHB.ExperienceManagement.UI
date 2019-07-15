import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../core/authentication.service';
import { ServerResponseViewModel } from './../../../dataModels/viewModels/serverResponseViewModel';
import { FilterType } from './../../../dataModels/enums/filterType';
import { IssueService } from './../../../core/issue.service';
import { EquipmentService } from 'src/app/core/equipment.service';
import { IssueType } from 'src/app/dataModels/enums/issueType';
import { Component, OnInit } from '@angular/core';
import { SearchIssueViewModel } from 'src/app/dataModels/viewModels/searchIssueViewModel';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SortType } from 'src/app/dataModels/enums/sortType';
import { SearchSmartIssueFormModel } from 'src/app/dataModels/apiModels/searchSmartIssueFormModel';
import { User } from 'src/app/dataModels/viewModels/user';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';

@Component({
  selector: 'app-issue-search',
  templateUrl: './issue-search.component.html',
  styleUrls: ['./issue-search.component.css']
})
export class IssueSearchComponent implements OnInit {

  files: any[];
  selectedIds = [];
  issueType = IssueType;
  issues = new SearchIssueViewModel();
  currentUser: User;
  loading = false;

  sortTypesSelect: any;
  filterTypesSelect: any;

  searchModel = new SearchSmartIssueFormModel();


  constructor(private issueService: IssueService,
              private route: ActivatedRoute,
              private equipmentService: EquipmentService,
              private authenticationService: AuthenticationService,
              private persianDatePickerHelper: PersianDatePickerHelper,
              public translate: TranslateService,
              private toastr: ToastrService) {
            }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.loadTree();
    this.sortTypesSelect = Object.keys(SortType).filter(Number).map(key => ({ title: SortType[key], value: key }));
    this.filterTypesSelect = Object.keys(FilterType).filter(Number).map(key => ({ title: FilterType[key], value: key }));


    this.route.params.subscribe(param => {
      this.searchModel.searchContent = param.content as string;
      this.loadQuestion();
    });
  }


  loadTree() {
    this.equipmentService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.searchModel.equipmentIds = param;
    }
  }

  loadQuestion() {
    this.searchModel.userId = this.currentUser ? this.currentUser.id : null;
    this.loading = true;
    this.issueService.searchSmartIssue(this.searchModel).subscribe((res: ServerResponseViewModel<SearchIssueViewModel>) => {
      this.issues = res.data;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  timeConvert(time: string) {
    return this.persianDatePickerHelper.getDatePer(this.persianDatePickerHelper.setDate(time, false))
      + ' ' + new Date(time).toLocaleTimeString();
  }

}
