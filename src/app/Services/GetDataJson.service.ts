import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Data } from '../Models/Data.model';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class GetDataJson { 

    constructor (private http: HttpClient){ }

    getData() : Observable<Data> {
        return this.http.get<Data>('../../assets/Json/Data.json');        
    }
}