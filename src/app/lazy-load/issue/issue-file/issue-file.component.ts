import { IssueService } from 'src/app/core/issue.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { ImageData } from './../../../dataModels/interfaces/imageData';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { IssueDetailAttachmentViewModel } from './../../../dataModels/viewModels/issueDetailAttachmentViewModel';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/dataModels/viewModels/user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-issue-file',
  templateUrl: './issue-file.component.html',
  styleUrls: ['./issue-file.component.css']
})
export class IssueFileComponent implements OnInit {

  submitted = false;
  loading = false;
  @Input() issuettachments: Array<IssueDetailAttachmentViewModel>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public config: DropzoneConfigInterface;
  currentUser: User;
  uploadFiles = new Array<ImageData>();

  constructor(
    private authenticationService: AuthenticationService,
    public activeModal: NgbActiveModal,
    private issueService: IssueService,
    private toastr: ToastrService,
    public translate: TranslateService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit(): void {
    this.config = {
      clickable: true, maxFiles: 4, autoReset: null, errorReset: null, cancelReset: null,
      url: 'api/file/upload', headers: {
        Authorization: `Bearer ${this.currentUser.token}`
      },
      addRemoveLinks: true
    };

    this.setImageObject();
  }

  setImageObject() {
    debugger;
    this.galleryOptions = [
      {
        thumbnailActions: [{
          icon: 'fa fa-times-circle text-danger', onClick: this.deleteImage.bind(this),
          titleText: this.translate.instant('Issue.DeleteFiles')
        }]
      },
      {
        breakpoint: 800,
        width: '600px',
        height: '400px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      { breakpoint: 400, preview: false, }
    ];

    this.galleryImages = new Array<NgxGalleryImage>();
    this.issuettachments.forEach(x => {
      if (x.contentType.includes('image')) {
        this.galleryImages.push({
          small: '/api/File/download/' + x.fileId,
          big: '/api/File/download/' + x.fileId,
        });
      } else {
        this.galleryImages.push({
          small: x.contentType.includes('video') ? 'assets/images/video.png' : 'assets/images/audio.jpg',
          big: 'assets/images/video.jpg'
        });
      }

    });


  }


  close() {
    this.activeModal.close();
  }

  deleteImage(event, index): void {
    const url = this.galleryImages[index].big;
    const image = this.issuettachments.find(x => '/api/File/download/' + x.fileId === url);

    this.issueService.deleteImageAttachment(image.id).subscribe(res => {
      this.galleryImages.splice(index, 1);
      this.toastr.success(this.translate.instant('Issue.DeleteFileSuccessfully'));
    });

  }

  public onUploadError(args: any): void {
    this.toastr.error(this.translate.instant('General.UploadError'));
  }

  public onUploadSuccess(result: any): void {
    if (result && result.length > 0) {
      if (result[1].data !== '') {
        this.uploadFiles.push({ id: result[1].data, uuid: result[0].upload.uuid });
      }
    }
  }

  addImage() {
    if (this.uploadFiles.length > 0) {
      this.loading = true;
      // this.addAttachmentsForm.uploadFiles = this.uploadFiles.map(x => x.id);

      // this.accommodationService.setAccommodationAttachments(this.addAttachmentsForm).subscribe(res => {
      //   this.toastr.success(this.translate.instant('Accommodation.AddImagesSuccessfully'));
      //   this.addAttachmentsForm.uploadFiles.forEach(i => {
      //     this.galleryImages.push(i);
      //   });
      //   this.addAttachmentsForm.uploadFiles = new Array<string>();
      //   this.uploadFiles = new Array<ImageData>();
      //   this.loading = false;
      // }, error => {
      //   this.loading = false;
      // });
    } else {
      this.toastr.warning(this.translate.instant('General.ModelStateError'));
    }
  }

  onRemoveFile(result: any) {
    const index = this.uploadFiles.findIndex(x => x.uuid === result.upload.uuid);
    this.uploadFiles.splice(index, 1);
  }

}
