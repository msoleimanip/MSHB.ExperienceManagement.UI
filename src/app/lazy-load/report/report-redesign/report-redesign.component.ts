import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

declare var Stimulsoft: any;

@Component({
  selector: 'app-report-redesign',
  templateUrl: './report-redesign.component.html',
  styleUrls: ['./report-redesign.component.css']
})
export class ReportRedesignComponent implements OnInit {

  submitted = false;
  loading = false;

  options: any;
  designer: any;

  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.options = new Stimulsoft.Designer.StiDesignerOptions();
    this.options.appearance.fullScreenMode = false;
    this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);
    this.designer.report = new Stimulsoft.Report.StiReport();
    // this.designer.report.loadFile('/reports/SimpleList.mrt');
    this.designer.report.render();
    this.designer.renderHtml('report');
    this.designer.onSaveReport = function (arg) {
      alert(arg.report.reportFile);
    };
  }

  close() {
    this.activeModal.close();
  }

}
