import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable } from 'rxjs';

/**
 * Serviço para manipulação de eventos do objeto window
 * 
 * Encapsula a lógica de observação de eventos de redimensionamento da janela
 * 
 * Pode usar injeção de dependência para garantir que o código que manipula o window só seja executado no cliente.
 */
@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  onResize(): Observable<number> {
    if (this.isBrowser) {
      return fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          map(() => window.innerWidth),
          distinctUntilChanged()
        );
    } else {
      // Retorne um Observable vazio ou um valor padrão para o servidor
      return new Observable<number>();
    }
  }
  
}
