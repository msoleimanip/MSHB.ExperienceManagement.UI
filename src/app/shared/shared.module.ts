import { RouterModule } from '@angular/router';
import { NgbDatepickerI18nPersian, NgbDatepickerI18nGregorian } from '../core/persianDatePickerHelper';
import { NgbdSortableHeader } from './../_directives/sortable.directive';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { TreeviewComponent } from './treeview/treeview.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './notFound/not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerI18n, NgbCalendar, NgbCalendarPersian, NgbCalendarGregorian, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    SharedRoutingModule,
    NgxGalleryModule,
    RouterModule
  ],
  declarations: [
    TreeviewComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    NgbdSortableHeader,
    ContactUsComponent
  ],
  exports: [
    TreeviewComponent,
    AccessDeniedComponent,
    NotFoundComponent,
    NgbdSortableHeader,
    ContactUsComponent],
  providers: [
    { provide: NgbCalendar, useClass: environment.language === 'fa' ? NgbCalendarPersian : NgbCalendarGregorian },
    { provide: NgbDatepickerI18n, useClass: environment.language === 'fa' ? NgbDatepickerI18nPersian : NgbDatepickerI18nGregorian }
  ],
  entryComponents: []
})

export class SharedModule { }
