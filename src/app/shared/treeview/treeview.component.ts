import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class TreeviewComponent implements OnInit, OnChanges {

  @Input() titleLabel = 'Tree';
  @Input() id = '';
  @Input() items: any[];
  @Input() hasCheckbox = false;
  @Input() canSearch = false;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() dblClick: EventEmitter<any> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const self = this;
    if (changes.items !== undefined && changes.items.currentValue !== undefined) {
      this.createTree(self, changes.items.currentValue);
    }
  }

  createTree(self: any, items: any) {
    $('#tr' + self.id).jstree({
      checkbox: {
        keep_selected_style: false
      },
      plugins: [(self.hasCheckbox ? 'checkbox' : ''), (self.canSearch ? 'search' : '')],
      core: {
        multiple: true,
        check_callback: true,
        expand_selected_onload: false,
        data: items,
      },
    });

    $('#txtSearchTree' + self.id).keyup(function () {
      $('#tr' + self.id).jstree(true).search($('#txtSearchTree' + self.id).val());
    });

    // $('#tr').jstree(true).refresh();

    $('#tr' + self.id).click(function () {
      let orgChartId = 0;
      let temp = GetNode();
      if (temp.length > 0) {
        orgChartId = temp[0];

        self.click.emit(orgChartId);
      }
    });

    $('#tr' + self.id).dblclick(function () {
      let orgChartId = 0;
      let temp = GetNode();
      if (temp.length > 0) {
        orgChartId = temp[0];

        self.dblClick.emit(orgChartId);
      }
    });

    $('#tr' + self.id).on('changed.jstree', function (e, data) {
      self.changed.emit(data.selected);
    });

    function GetNode() {
      return $('#tr' + self.id).jstree('get_selected');
    }

  }

}
