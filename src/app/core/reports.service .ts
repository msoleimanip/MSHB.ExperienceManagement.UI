import { Injectable, OnInit } from '@angular/core';
import { ReportDesignFormModel } from '../dataModels/apiModels/reportDesignFormModel ';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ServerResponseViewModel } from '../dataModels/viewModels/serverResponseViewModel';
import { Observable } from 'rxjs';

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
        this.options.appearance.fullScreenMode = true;
        this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'designer', false);
        this.report = new Stimulsoft.Report.StiReport('report');
        this.report.load(format);
        this.report.dictionary.databases.clear();
        let dataset = new Stimulsoft.System.Data.DataSet('SimpleDataSet');
        dataset.readJson(JSON.stringify(data));
        this.report.regData(dataset.dataSetName, '', dataset);

        this.report.dictionary.synchronize();
        this.designer.report = this.report;
        let self = this;
        this.designer.onSaveReport = function (arg) {
            let reportDesign = new ReportDesignFormModel();
            reportDesign.ReportId = reportId;
            reportDesign.Configuration = arg.report.saveToJsonString();
            self.updateReportStructureById(reportDesign).subscribe((res: ServerResponseViewModel<boolean>) => {
                self.toastr.success('' + res.data);
            });
        };
        this.designer.renderHtml('reportsViewer');
    }


    disposeDesignReport() {
        document.getElementById('reportsViewer').innerHTML = '';
    }

    generateReport(format: any, data: string) {
        let report = new Stimulsoft.Report.StiReport();
        report.load(format);
        report.dictionary.databases.clear();
        let dataset = new Stimulsoft.System.Data.DataSet('SimpleDataSet');
        dataset.readJson(JSON.stringify(data));
        report.regData(dataset.dataSetName, '', dataset);
        this.viewer.report = report;
    }

    updateReportStructureById(reportDesign) {
        return this.http.post('', reportDesign);
    }

    getReportStructureById(reportId) {
        return this.http.post('', { reportId: reportId });
    }

    getUsersReport(): Observable<any> {
        return this.http.get('');
    }
}
