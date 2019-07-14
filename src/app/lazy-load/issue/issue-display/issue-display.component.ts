import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IssuePlayerComponent } from './../issue-player/issue-player.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueDetailViewModel } from './../../../dataModels/viewModels/issueDetailViewModel';
import { SearchIssueDetailFormModel } from './../../../dataModels/apiModels/searchIssueDetailFormModel';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/core/issue.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-issue-display',
  templateUrl: './issue-display.component.html',
  styleUrls: ['./issue-display.component.css']
})
export class IssueDisplayComponent implements OnInit {

  searchIssueDetailModel = new SearchIssueDetailFormModel();
  issueDetails = new Array<IssueDetailViewModel>();

  galleryOptions: NgxGalleryOptions[] = [{
    thumbnailActions: [{
      icon: 'fa fa-play-circle-o', onClick: this.playVideo.bind(this),
      titleText: 'play'
    }], image: false, height: '100px'
  }, { breakpoint: 500, width: '100%' }];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '350px;',
    placeholder: 'Enter text here...',
    translate: 'no',
  };

  constructor(private route: ActivatedRoute,
    private issueService: IssueService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.searchIssueDetailModel.issueId = param.id as number;
      this.issueService.getIssueDetails(this.searchIssueDetailModel)
        .subscribe((res: ServerResponseViewModel<Array<IssueDetailViewModel>>) => {
          this.issueDetails = res.data;
        });
    });
  }

  loadImage(id: number) {

    const self = this;
    const galleryImages = new Array<NgxGalleryImage>();
    this.issueDetails.find(x => x.issueDetailId === id).issueDetailAttachments.forEach(x => {
      if (x.fileType === 'jpg' || x.fileType === 'thumb') {
        galleryImages.push({
          small: '/api/File/download/' + x.fileId,
          big: '/api/File/download/' + x.fileId,
        });
      } else {
        galleryImages.push({
          small: 'assets/images/video.png',
          big: 'assets/images/video.jpg'
        });
      }
    });
    return galleryImages;
  }

  playVideo(event, index) {
    const id = event.currentTarget.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.id;
    const issuedet = this.issueDetails.find(x => x.issueDetailId === parseInt(id, 0));
    if (issuedet) {
      const file = issuedet.issueDetailAttachments[index];
      if (file.fileType !== 'jpg' && file.fileType !== 'thumb') {
        let modalRef = this.modalService.open(IssuePlayerComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.fileUrl = '/api/File/download/' + file.fileId;
        modalRef.componentInstance.fileType = file.fileType;
      } else {
        this.toastr.warning(this.translate.instant('Issue.JustImage'));
      }
    }
  }

}
