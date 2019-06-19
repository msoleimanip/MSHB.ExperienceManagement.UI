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
  @Input() canSearch = false;
  @Output() dblClick: EventEmitter<any> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() clickByCheckbox: EventEmitter<any> = new EventEmitter();
  firstLoad = true;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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

      $('#txtSearchTree' + self.id).keyup(function () {
        $('#tr' + self.id).jstree(true).search($('#txtSearchTree' + self.id).val());
      });

      $('#tr' + self.id).click(function () {
        if (!self.hasCheckbox) {
          self.click.emit(GetNode());
        } else {
          self.clickByCheckbox.emit(GetNodeByChange());
        }

      });

      $('#tr' + self.id).dblclick(function () {
        let temp = GetNode();
        if (temp) {
          self.dblClick.emit(temp);
        }
      });

      this.firstLoad = false;
    }

    function GetNode() {
      let selectedNode = $('#tr' + self.id).jstree('get_selected', true)[0];
      if (selectedNode) {
        let rootTitle = selectedNode.text;

        selectedNode.parents.forEach(element => {
          if (element !== '#') {
            rootTitle += ' / ' + $('#tr' + self.id).jstree(true).get_node(element).text;
          }
        });
        return { id: selectedNode.id, parents: rootTitle };
      }
      return { id: 0, parents: '' };
    }

    function GetNodeByChange() {
      let selectedNodes = $('#tr' + self.id).jstree('get_selected', true);
      let nodes = [];
      if (selectedNodes && selectedNodes.length > 0) {

        selectedNodes.forEach(element => {
          let temp = $('#tr' + self.id).jstree().get_node(element);
          if (temp.children.length === 0) {
            debugger;
            nodes.push(element.id);
          }
        });
      }
      return nodes;
    }
  }

}
