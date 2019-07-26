import { environment } from 'src/environments/environment.prod';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core/reports.service ';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  loading = false;

  constructor(
    private reportsService: ReportsService,
    public translate: TranslateService,
    private toastr: ToastrService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


  generateReport() {
    //this.reportQuery.sIds = this.reportsService.subjectDetails.map(m => m.sId);
    this.loading = true;
    this.reportsService.getUsersReport()
      .subscribe((res: ServerResponseViewModel<any>) => {
        this.reportsService.getReportStructureById('UserReport').subscribe((item: ServerResponseViewModel<any>) => {
          this.reportsService.generateReport(item.data.configuration, res.data);
        })
      },
      );

  }


  designReport() {
    this.loading = true;
    this.reportsService.getUsersReport().subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructureById('UserReport').subscribe((item: ServerResponseViewModel<any>) => {
        this.reportsService.loadDesignReport(item.data.configuration, res.data, 'CallReport');
      })
    },
    );

  }

}
