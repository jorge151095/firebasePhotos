import { Directive, EventEmitter, ElementRef,
HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }

  @Input() files: FileItem[] = [];

  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
      this.mouseOver.emit( true );
      this._preventStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
      this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
      this._preventStop( event );
      const transfer = this._getTransfer( event );
      if ( !transfer ) {
        return;
      }
      this._getFiles( transfer.files );
      this.mouseOver.emit( false );
  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFiles( filesList: FileList ) {
    // tslint:disable-next-line: forin
    for ( const property in Object.getOwnPropertyNames( filesList )) {
      const fileTemp = filesList[property];

      if ( this._fileCanBeLoaded( fileTemp )) {
        const newFile = new FileItem ( fileTemp);
        this.files.push( newFile );
      }
    }
  }

  //Validations
  private _fileCanBeLoaded( file: File ): boolean {
    if (!this._fileWasDropped( file.name ) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasDropped( fileName: string): boolean {
    for (const file of this.files ) {
      if (file.fileName === fileName ) {
        console.log(`File ${fileName} exists`);
        return true;
      }
    }

    return false;
  }

  private _isImage( fileType: string ): boolean {
    return ( fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }
}
