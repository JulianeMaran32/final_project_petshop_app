import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { catchError, Observable, OperatorFunction, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private storage = inject(Storage);

  constructor(private logger: LoggerService) {}

  uploadImage(file: File, path: string): Observable<string> {
    return new Observable((observer) => {
      const filePath = `${path}/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Lógica para o progresso do upload, se necessário
        },
        (error) => {
          let errorMsg: string;

          // Tratamento específico para diferentes erros
          switch (error.code) {
            case 'storage/unauthorized':
              errorMsg = 'Você não tem permissão para realizar o upload.';
              break;
            case 'storage/canceled':
              errorMsg = 'O upload foi cancelado pelo usuário.';
              break;
            case 'storage/unknown':
            default:
              errorMsg = 'Ocorreu um erro desconhecido durante o upload.';
              break;
          }

          this.logger.error('Erro durante o upload da imagem:', error);
          observer.error(errorMsg); // Emite um erro com uma mensagem amigável
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            observer.next(downloadURL);
            observer.complete();
          } catch (downloadError) {
            this.logger.error('Erro ao obter URL de download:', downloadError);
            observer.error('Erro ao obter URL de download da imagem.');
          }
        }
      );
    }).pipe(
      catchError((err: unknown): Observable<string> => {
        this.logger.error('Erro no serviço de upload:', err);
        return throwError(() => new Error('Erro no upload. Por favor, tente novamente mais tarde.'));
      }) as OperatorFunction<unknown, string>
    );
  }

}
