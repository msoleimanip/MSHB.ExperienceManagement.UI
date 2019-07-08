import { Injectable, DebugElement } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'jalali-moment';

const WEEKDAYS_SHORT_PER = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS_PER = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

const WEEKDAYS_SHORT = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT_PER[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS_PER[month - 1]; }
  getMonthFullName(month: number) { return MONTHS_PER[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

@Injectable()
export class NgbDatepickerI18nGregorian extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

export class PersianDatePickerHelper {

  getDate(date: NgbDateStruct, isFa: boolean): string {
    if (date) {
      let dt = date.year + '/' + date.month + '/' + date.day;
      if (isFa) {
        let MomentDate = moment(dt, 'jYYYY/jM/jD');
        if (MomentDate.isValid()) {
          let geoDate = MomentDate.format('YYYY/M/D');
          return geoDate;
        }
      } else {
        let MomentDate = moment(dt, 'YYYY/M/D');
        if (MomentDate.isValid()) {
          return dt;
        }
      }
    }
    return '';
  }

  setDate(dt: string, isFa: boolean): NgbDateStruct {
    try {
      if (isFa) {
        let MomentDate = moment(dt, 'YYYY/M/D');
        if (MomentDate.isValid()) {
          let perDate = MomentDate.format('jYYYY/jMM/jDD');
          return { year: Number.parseInt(perDate.substr(0, 4)), month: Number.parseInt(perDate.substr(5, 2)), day: Number.parseInt(perDate.substr(8, 2)) };
        }
      } else {
        let MomentDate = moment(dt, 'YYYY/M/D');
        if (MomentDate.isValid()) {
          let date = MomentDate.format('YYYY/MM/DD');
          return { year: Number.parseInt(date.substr(0, 4)), month: Number.parseInt(date.substr(5, 2)), day: Number.parseInt(date.substr(8, 2)) };
        }
      }
    } catch{ }
    return null;
  }

  getDatePer(date: NgbDateStruct) {
    let dt = date.year + '/' + date.month + '/' + date.day;
    let MomentDate = moment(dt, 'YYYY/M/D');
    if (MomentDate.isValid()) {
      let geoDate = MomentDate.format('jYYYY/jM/jD');
      return geoDate;
    }
  }
}
