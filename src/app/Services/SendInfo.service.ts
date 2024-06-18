import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class SendInfoService {
    
    private objetoSource = new BehaviorSubject(null);
    objetoActual = this.objetoSource.asObservable();

    sendInfo(objeto: any) {
      this.objetoSource.next(objeto);
    }
}