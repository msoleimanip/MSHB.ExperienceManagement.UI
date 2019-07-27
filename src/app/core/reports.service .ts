import { IssueOfUsersFormModel } from './../dataModels/apiModels/issueOfUsersFormModel';
import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ServerResponseViewModel } from '../dataModels/viewModels/serverResponseViewModel';
import { Observable } from 'rxjs';
import { UpdateReportStructureFormModel } from '../dataModels/apiModels/updateReportStructureFormModel';

declare var Stimulsoft: any;

@Injectable()
export class ReportsService implements OnInit {

  viewer: any;
  designer: any;
  report: any;
  options: any;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

  loadDesignReport(format: any, data: string, reportId: any) {
    this.options = new Stimulsoft.Designer.StiDesignerOptions();
    this.options.appearance.fullScreenMode = false;
    this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'designer', false);
    this.report = new Stimulsoft.Report.StiReport('report');
    this.report.load(format);
    this.report.dictionary.databases.clear();
    const dataset = new Stimulsoft.System.Data.DataSet('SimpleDataSet');
    dataset.readJson(JSON.stringify(data));
    this.report.regData(dataset.dataSetName, '', dataset);

    this.report.dictionary.synchronize();
    this.designer.report = this.report;
    const self = this;
    this.designer.onSaveReport = function (arg) {
      const reportDesign = new UpdateReportStructureFormModel();
      reportDesign.reportId = reportId;
      reportDesign.configuration = arg.report.saveToJsonString();
      self.updateReportStructureById(reportDesign).subscribe((res: ServerResponseViewModel<boolean>) => {
        self.toastr.success('SaveSuccessfully');
      });
    };
    this.designer.renderHtml('reportsViewer');
  }


  disposeDesignReport() {
    document.getElementById('reportsViewer').innerHTML = '';
  }

  generateReport(format: any, data: string) {
    const options = new Stimulsoft.Viewer.StiViewerOptions();
    options.height = '1180px';
    // options.width = "70%";
    options.appearance.scrollbarsMode = true;
    options.toolbar.showDesignButton = false;
    options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
    options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
    options.appearance.chartRenderType = Stimulsoft.Viewer.StiChartRenderType.Vector;

    // Create an instance of the viewer
    this.viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);


    this.viewer.showProcessIndicator();
    setTimeout(() => {
      const report = new Stimulsoft.Report.StiReport();
      report.load(format);
      report.dictionary.databases.clear();
      const dataset = new Stimulsoft.System.Data.DataSet('SimpleDataSet');
      dataset.readJson(JSON.stringify(data));
      report.regData(dataset.dataSetName, '', dataset);
      this.viewer.report = report;
      this.viewer.renderHtml('reportsViewer');
    }, 50);
  }

  updateReportStructureById(reportDesign: UpdateReportStructureFormModel) {
    return this.http.post('/api/Report/UpdateReportStructure', reportDesign);
  }

  getReportStructure(reportId) {
    return this.http.post('/api/Report/GetReportStructure', { reportId });
  }

  issueOfUsersReport(issueOfUsersModel: IssueOfUsersFormModel): Observable<any> {
    return this.http.post('/api/Report/IssueOfUsersReport', issueOfUsersModel);
  }
}
