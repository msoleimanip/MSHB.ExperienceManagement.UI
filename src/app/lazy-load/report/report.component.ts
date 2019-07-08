import { environment } from 'src/environments/environment.prod';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportRedesignComponent } from './report-redesign/report-redesign.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  reports = [{
    id: 1,
    title: 'رسید تایید رزرو',
    createDate: '1398/04/14'
  }, {
    id: 2,
    title: 'رسید پرداخت هزینه',
    createDate: '1398/04/14'
  }];

  constructor(private modalService: NgbModal,
    public translate: TranslateService,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  loadDesign(id: number) {
    let modalRef = this.modalService.open(ReportRedesignComponent, { windowClass: 'xl-modal', size: 'xl' as 'lg' });
  }

}
