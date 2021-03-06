import { DeleteIssueDetailAttachmentFormModel } from './../../../dataModels/apiModels/deleteIssueDetailAttachmentFormModel';
import { IssueDetailBestAnswerFormModel } from './../../../dataModels/apiModels/issueDetailBestAnswerFormModel';
import { AuthenticationService } from './../../../core/authentication.service';
import { IssueDetailsLikeFormModel } from './../../../dataModels/apiModels/issueDetailsLikeFormModel';
import { FileService } from '../../../core/file.service';
import { EquipmentAttachmentViewModel } from './../../../dataModels/viewModels/equipmentAttachmentViewModel';
import { IssueViewModel } from './../../../dataModels/viewModels/issueViewModel';
import { IssueDetailsComponent } from './../issue-details/issue-details.component';
import { IssueDetailCommentViewModel } from './../../../dataModels/viewModels/issueDetailCommentViewModel';
import { AddIssueDetailCommentFormModel } from './../../../dataModels/apiModels/addIssueDetailCommentFormModel';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IssuePlayerComponent } from './../issue-player/issue-player.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { IssueDetailViewModel } from './../../../dataModels/viewModels/issueDetailViewModel';
import { SearchIssueDetailFormModel } from './../../../dataModels/apiModels/searchIssueDetailFormModel';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueService } from 'src/app/core/issue.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SearchIssueDetailsViewModel } from 'src/app/dataModels/viewModels/searchIssueDetailsViewModel';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/dataModels/viewModels/user';
import { saveAs } from 'file-saver';
import { Guid } from 'guid-typescript';
import { IssueEditComponent } from '../issue-edit/issue-edit.component';
import { EditIssueDetailFormModel } from 'src/app/dataModels/apiModels/editIssueDetailFormModel';
import { EquipmentAttachmentUserFormModel } from 'src/app/dataModels/apiModels/equipmentAttachmentUserFormModel';
import { EquipmentService } from 'src/app/core/equipment.service';

@Component({
  selector: 'app-issue-display',
  templateUrl: './issue-display.component.html',
  styleUrls: ['./issue-display.component.css']
})
export class IssueDisplayComponent implements OnInit, OnDestroy {

  searchIssueDetailModel = new SearchIssueDetailFormModel();
  issueDetails = new Array<IssueDetailViewModel>();
  issue = new IssueViewModel();
  currentUser: User;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '350px;',
    placeholder: 'Enter text here...',
    translate: 'no',
  };

  constructor(
    private authenticationService: AuthenticationService,
    private location: Location,
    private route: ActivatedRoute,
    private issueService: IssueService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public translate: TranslateService,
    private fileService: FileService,
    private config: NgbModalConfig,
    private equipmentService: EquipmentService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.route.params.subscribe(param => {
      this.searchIssueDetailModel.issueId = param.id as number;
      this.issueService.getIssueDetails(this.searchIssueDetailModel)
        .subscribe((res: ServerResponseViewModel<SearchIssueDetailsViewModel>) => {
          if (res.data.issueDetailViewModel.length === 0) {
            this.toastr.error(this.translate.instant('Issue.IssueNotCompeleted'));
            this.location.back();
          }
          this.issueDetails = res.data.issueDetailViewModel;
          this.issue = res.data.issueViewModel;
        });
    });

    this.config.backdrop = false;
    this.config.keyboard = false;

  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  getGalleryOptions(userId: string) {
    const self = this;

    if (this.currentUser.id === userId) {
      return [{
        thumbnailActions: [{
          icon: 'fa fa-play-circle-o text-green', onClick: this.playVideo.bind(this),
          titleText: self.translate.instant('General.Play')
        },
        {
          icon: 'fa fa-trash-o text-danger', onClick: this.deleteFile.bind(this),
          titleText: self.translate.instant('General.Delete')
        }
        ], image: false, height: '100px'
      }, { breakpoint: 500, width: '100%' }];
    } else {
      return [{
        thumbnailActions: [{
          icon: 'fa fa-play-circle-o text-green', onClick: this.playVideo.bind(this),
          titleText: 'play'
        }
        ], image: false, height: '100px'
      }, { breakpoint: 500, width: '100%' }];
    }
  }

  loadImage(id: number) {

    const self = this;
    const galleryImages = new Array<NgxGalleryImage>();
    this.issueDetails.find(x => x.issueDetailId === id).issueDetailAttachments.forEach(x => {
      if (x.contentType.includes('image')) {
        galleryImages.push({
          small: '/api/File/download/' + x.fileId,
          big: '/api/File/download/' + x.fileId,
        });
      } else {
        galleryImages.push({
          small: x.contentType.includes('video') ? 'assets/images/video.png' : 'assets/images/audio.jpg',
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
      if (file.contentType.includes('video') || file.contentType.includes('audio')) {
        let modalRef = null;
        if (file.contentType.includes('video')) {
          modalRef = this.modalService.open(IssuePlayerComponent, {
            windowClass: '.my-modal',
            size: 'lg'
          });
        } else {
          modalRef = this.modalService.open(IssuePlayerComponent, {
            windowClass: 'md-modal', size: 'md' as 'lg'
          });
        }

        modalRef.componentInstance.fileUrl = '/api/File/download/' + file.fileId;
        modalRef.componentInstance.fileType = file.fileType;
        modalRef.componentInstance.contentType = file.contentType;
        modalRef.componentInstance.isVedio = file.contentType.includes('video');
      } else if (file.contentType.includes('image')) {
        this.toastr.warning(this.translate.instant('Issue.ClickOnImage'));
      } else {
        this.toastr.warning(this.translate.instant('Issue.NotSupported'));
      }
    }
  }

  deleteFile(event, index) {

    if (confirm(this.translate.instant('Issue.DeleteQuestion'))) {

      const id = event.currentTarget.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.id;
      const issuedet = this.issueDetails.find(x => x.issueDetailId === parseInt(id, 0));
      if (issuedet) {
        const file = issuedet.issueDetailAttachments[index];

        const deleteModel = new DeleteIssueDetailAttachmentFormModel();
        deleteModel.fileId = file.fileId;
        deleteModel.issueDetailId = file.issueDetailId;

        this.issueService.deleteIssueDetailAttachment(deleteModel).subscribe((res: ServerResponseViewModel<boolean>) => {
          if (res.data) {
            this.toastr.success(this.translate.instant('General.DeleteFileSuccessfully'));
            issuedet.issueDetailAttachments.splice(index, 1);
          }
        });
      }
    }
  }

  addComment(issueDetailId: number, input: HTMLInputElement) {
    const model = new AddIssueDetailCommentFormModel();
    model.comment = input.value;
    model.issueDetailId = issueDetailId;

    this.issueService.addIssueDetailComment(model).subscribe((res: ServerResponseViewModel<IssueDetailCommentViewModel>) => {
      this.toastr.success(this.translate.instant('Issue.AddCommentSuccessfully'));
      this.issueDetails.find(x => x.issueDetailId === issueDetailId).issueDetailComments.push(res.data);
      input.value = '';
    });
  }

  addAnswer() {
    const modalRef = this.modalService.open(IssueDetailsComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.componentInstance.issueId = this.searchIssueDetailModel.issueId;
    modalRef.componentInstance.equipmentIds = this.issue.equipments.map(x => x.id);
    modalRef.result.then(result => {
      if (result) {
        this.issueDetails.push(result);
      }
    });
  }

  like(id: number, isLike: boolean, img: HTMLImageElement, btn: HTMLButtonElement) {

    img.style.display = '';
    btn.style.display = 'none';

    const issueDetailsLikeModel = new IssueDetailsLikeFormModel();
    issueDetailsLikeModel.issueDetailId = id;
    issueDetailsLikeModel.isLike = !isLike;
    this.issueService.issueDetailsLike(issueDetailsLikeModel).subscribe((res: ServerResponseViewModel<number>) => {
      this.issueDetails.find(x => x.issueDetailId === id).likes = res.data;

      img.style.display = 'none';
      btn.style.display = '';
    }, error => {
      img.style.display = 'none';
      btn.style.display = '';
    });
  }

  answerChange(value: boolean, id: number, isAnswer: HTMLImageElement, answer: HTMLImageElement, answerLoading: HTMLImageElement) {

    if (this.currentUser.id !== this.issue.userId) {
      return;
    }

    answerLoading.style.display = '';
    if (isAnswer) { isAnswer.style.display = 'none'; }
    if (answer) { answer.style.display = 'none'; }

    const issueDetailBestAnswerModel = new IssueDetailBestAnswerFormModel();
    issueDetailBestAnswerModel.issueDetailId = id;
    issueDetailBestAnswerModel.isAnswer = value;
    this.issueService.issueDetailsBestAnswer(issueDetailBestAnswerModel).subscribe((res: ServerResponseViewModel<boolean>) => {

      answerLoading.style.display = 'none';
      if (isAnswer) { isAnswer.style.display = ''; }
      if (answer) { answer.style.display = ''; }

      this.issueDetails.find(x => x.issueDetailId === id).isCorrectAnswer = value;
    }, error => {
      answerLoading.style.display = 'none';
      if (isAnswer) { isAnswer.style.display = ''; }
      if (answer) { answer.style.display = ''; }
    });
  }

  fetchTranslation(userId: string): string {
    if (userId === this.currentUser.id) {
      return this.translate.instant('Issue.IsYourAnswer');
    } else {
      return '';
    }
  }

  loadEdit(issueDetail: IssueDetailViewModel) {

    const model = new EquipmentAttachmentUserFormModel();
    model.equipmentIds = this.issue.equipments.map(x => x.id);
    this.equipmentService.getEquipmentAttachmentForUser(model)
      .subscribe((arg: ServerResponseViewModel<Array<EquipmentAttachmentViewModel>>) => {
        const modalRef = this.modalService.open(IssueEditComponent, { windowClass: '.my-modal', size: 'lg' });

        const editIssueDetailModel = new EditIssueDetailFormModel();
        editIssueDetailModel.caption = issueDetail.caption;
        editIssueDetailModel.issueId = this.searchIssueDetailModel.issueId;
        editIssueDetailModel.issueDetailId = issueDetail.issueDetailId;
        editIssueDetailModel.text = issueDetail.text;
        // editIssueDetailModel.uploadFiles = issueDetail.issueDetailAttachments.map(x => x.fileId);
        editIssueDetailModel.userId = this.currentUser.id;
        modalRef.componentInstance.editIssueDetailModel = editIssueDetailModel;

        modalRef.componentInstance.equipmentIds = this.issue.equipments.map(x => x.id);
        modalRef.componentInstance.equipmentAttachments = arg.data;
        modalRef.componentInstance.equipmentAttachmentIds = issueDetail.equipmentAttachmentViewModels.map(x => x.equipmentAttachmentId);

        modalRef.result.then(result => {
          if (result) {
            const isuDet = this.issueDetails.find(x => x.issueDetailId === issueDetail.issueDetailId);
            isuDet.caption = result.caption;
            isuDet.text = result.text;
            isuDet.equipmentAttachmentViewModels = arg.data.filter(x => result.equipmentAttachmentIds.includes(x.equipmentAttachmentId));
          }
        });
      });
  }


  filePreview(param: EquipmentAttachmentViewModel) {

    this.issueService.downloadFile(param.fileId).subscribe(success => {
      try {
        saveAs(success, Guid.create() + '.' + param.fileType);
      } catch { }
    }, err => {
      this.toastr.error(this.translate.instant('General.FilePreviewError'));
    });
  }
}
