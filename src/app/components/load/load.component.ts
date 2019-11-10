import { Component } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { LoadImagesService } from '../../services/load-images.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent {

  constructor(public loadImagesService: LoadImagesService) { }

  public isOverElement = false;
  public files: FileItem[] = [];

  loadImages( ) {
    this.loadImagesService.loadImagesFirebase( this.files);
  }

  clearFiles() {
    this.files = [];
  }
}
