import { Component } from '@angular/core';
import { UploadService } from '../../../core/services/upload.service';
import { CommonModule } from '@angular/common';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
  providers: [UploadService, LoggerService]
})
export class ImageUploaderComponent {

  uploadProgress: number | undefined;
  downloadURL: string | undefined;
  errorMessage: string | undefined; 

  constructor(
    private uploadService: UploadService,
    private logger: LoggerService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadService.uploadImage(file, 'uploads').subscribe({
        next: (url) => {
          this.downloadURL = url;
          this.errorMessage = undefined; 
          console.log('URL de download:', url);
        },
        error: (err) => {
          this.errorMessage = err; 
          this.logger.warn('Erro ao fazer upload de imagem no componente:', err);
        }
      });
    }
  }

}
