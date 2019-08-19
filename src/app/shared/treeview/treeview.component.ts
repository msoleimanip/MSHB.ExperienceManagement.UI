import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

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
  @Input() byParentIds = false;
  @Input() canSearch = false;
  @Input() selectItem: string;
  @Output() dblClick: EventEmitter<any> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() clickByCheckbox: EventEmitter<any> = new EventEmitter();
  @Output() loaded: EventEmitter<any> = new EventEmitter();
  firstLoad = true;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.selectItem) {
      if (!this.firstLoad) {
        $('#tr' + this.id).jstree(true).select_node(changes.selectItem.currentValue);
      }
    }

    const self = this;
    if (changes.items !== undefined && changes.items.currentValue !== undefined) {
      this.createTree(self, changes.items.currentValue);
    }
  }

  createTree(self: any, items: any) {
    if (!this.firstLoad) {
      $('#tr' + self.id).jstree(true).settings.core.data = items;
      $('#tr' + self.id).jstree(true).refresh();
    }

    if (this.firstLoad) {
      $('#tr' + self.id).jstree({
        checkbox: {
          keep_selected_style: false
        },
        plugins: [(self.hasCheckbox ? 'checkbox' : ''), (self.canSearch ? 'search' : '')],
        core: {
          multiple: true,
          check_callback: true,
          expand_selected_onload: true,
          data: items
        },
      });

      // tslint:disable-next-line: only-arrow-functions
      $('#tr' + self.id).bind('loaded.jstree', function (event, data) {
        $('#tr' + self.id).click();
        self.loaded.emit();
      });

      // tslint:disable-next-line: only-arrow-functions
      $('#txtSearchTree' + self.id).keyup(function () {
        $('#tr' + self.id).jstree(true).search($('#txtSearchTree' + self.id).val());
      });

      // tslint:disable-next-line: only-arrow-functions
      $('#tr' + self.id).click(function () {
        if (!self.hasCheckbox) {
          self.click.emit(GetNode());
        } else {
          self.clickByCheckbox.emit(GetNodeByHasChange());
        }

      });

      // tslint:disable-next-line: only-arrow-functions
      $('#tr' + self.id).dblclick(function () {
        const temp = GetNode();
        if (temp) {
          self.dblClick.emit(temp);
        }
      });

      this.firstLoad = false;
    }

    function GetNode() {
      const selectedNode = $('#tr' + self.id).jstree('get_selected', true)[0];
      if (selectedNode) {
        let rootTitle = selectedNode.text;
        const hasChild = selectedNode.children.length === 0 ? false : true;

        selectedNode.parents.forEach(element => {
          if (element !== '#') {
            rootTitle += ' / ' + $('#tr' + self.id).jstree(true).get_node(element).text;
          }
        });
        return { id: selectedNode.id, parents: rootTitle, hasChild };
      }
      return { id: 0, parents: '' };
    }

    function GetNodeByHasChange() {
      const selectedNodes = $('#tr' + self.id).jstree('get_selected', true);
      let nodes = [];
      if (selectedNodes && selectedNodes.length > 0) {
        
        selectedNodes.forEach(element => {
          const temp = $('#tr' + self.id).jstree().get_node(element);
          if (!self.byParentIds) {
              nodes.push(element.id);
          } else {
            nodes.push(element.id);
            element.parents.forEach(parent => {
              if (!nodes.contains(parent) && parent !== '#') {
                nodes.push(parent);
              }
            });
          }
        });
      }
      return nodes;
    }
  }

}
