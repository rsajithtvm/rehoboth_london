import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewEncapsulation } from "@angular/core";
import { FileUploadService } from "../service/fileupload.service";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-fileupload",
  templateUrl: "./fileupload.component.html",
  styleUrls: ["./fileupload.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  memberData: any;
  fileInfos?: Observable<any>;
  imageSrc: any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private uploadService: FileUploadService,
    public dialogRef: MatDialogRef<FileUploadComponent>,) { }
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.selectedFiles[0]);
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        let filename = `${this.memberData.memberid || this.memberData.trainerid}.${file.name.split('.').pop()}`;
        
        this.uploadService.upload(this.currentFile, filename).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              this.event.emit(this.fileInfos);
              setTimeout(() => {
                this.dialogRef.close();
              }, 2000);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
