import { Component, EventEmitter, Output } from '@angular/core';
import { UploadService } from '../../core/services/upload.service';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../core/services/logger.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadService, LoggerService]
})
export class UploadComponent {

  @Output() uploadComplete = new EventEmitter<string>();

  selectedFile: File | null = null;
  downloadURL: string | null = null;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const filePath = `uploads/${this.selectedFile.name}`;
      this.uploadService.uploadFile(this.selectedFile, filePath).subscribe({
        next: (url) => {
          this.downloadURL = url;
          this.uploadComplete.emit(url);
          console.log('File available at', url);
        },
        error: (error) => {
          console.error('Upload failed', error);
        }
      });
    }
  }

}
