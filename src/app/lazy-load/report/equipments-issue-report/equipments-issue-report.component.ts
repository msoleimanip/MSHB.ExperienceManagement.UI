import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IssueOfEquipmentFormModel } from './../../../dataModels/apiModels/issueOfEquipmentFormModel';
import { AuthenticationService } from './../../../core/authentication.service';
import { EquipmentService } from 'src/app/core/equipment.service';
import { PresidentType } from './../../../dataModels/enums/presidentType';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/dataModels/viewModels/user';
import { ReportsService } from 'src/app/core/reports.service ';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { ReportStructureViewModel } from 'src/app/dataModels/viewModels/reportStructureViewModel';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';

@Component({
  selector: 'app-equipments-issue-report',
  templateUrl: './equipments-issue-report.component.html',
  styleUrls: ['./equipments-issue-report.component.css']
})
export class EquipmentsIssueReportComponent implements OnInit, OnDestroy {

  loading = false;
  currentUser: User;
  presidentType = PresidentType;

  files: any[];
  issueOfEquipmentModel = new IssueOfEquipmentFormModel();

  startDateTemplate: NgbDateStruct;
  endDateTemplate: NgbDateStruct;

  constructor(
    private authenticationService: AuthenticationService,
    private reportsService: ReportsService,
    public translate: TranslateService,
    private equipmentService: EquipmentService,
    private persianDatePickerHelper: PersianDatePickerHelper,
    private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.loadTree();
  }

  ngOnDestroy() {
    this.reportsService.disposeDesignReport();
  }


  loadTree() {
    this.equipmentService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.issueOfEquipmentModel.equipmentIds = param;
    }
  }

  generateReport() {
    this.reportsService.disposeDesignReport();

    if (this.issueOfEquipmentModel.equipmentIds.length === 0) {
      this.toastr.error(this.translate.instant('Report.IdsCountIsZero'));
      return;
    }


    this.issueOfEquipmentModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.issueOfEquipmentModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    this.loading = true;
    this.reportsService.issueOfEquipmentsReport(this.issueOfEquipmentModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('IssueOfEquipments').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportsService.generateReport(item.data.configuration, res.data);
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }, error => {
      this.loading = false;
    });

  }


  designReport() {
    this.reportsService.disposeDesignReport();

    if (this.issueOfEquipmentModel.equipmentIds.length === 0) {
      this.toastr.error(this.translate.instant('Report.IdsCountIsZero'));
      return;
    }

    this.issueOfEquipmentModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.issueOfEquipmentModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    this.loading = true;
    this.reportsService.issueOfEquipmentsReport(this.issueOfEquipmentModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('IssueOfEquipments').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportsService.loadDesignReport(item.data.configuration, res.data, 'IssueOfEquipments');
      });
    });
  }

}
