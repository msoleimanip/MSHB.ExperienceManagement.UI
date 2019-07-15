import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issue-player',
  templateUrl: './issue-player.component.html',
  styleUrls: ['./issue-player.component.css']
})
export class IssuePlayerComponent implements OnInit {

  @Input() fileUrl: string;
  @Input() contentType: string;
  @Input() isVedio: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close();
  }

}
