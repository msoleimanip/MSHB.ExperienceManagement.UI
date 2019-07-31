import { FileService } from './../../core/file.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {

  url: string;
  contentType: string;
  constructor(private activatedRoute: ActivatedRoute, private fileService: FileService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {
      this.url = '/api/file/download/' + param.id as string;
      this.contentType = (param.contentType as string).replace('-', '/');
    });
  }

}
