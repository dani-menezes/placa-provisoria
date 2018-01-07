import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { Context } from 'app/contexts/context/context.model'
import { BACKEND_API } from '../../app.backend-api'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ContextService {

    private _authToken: string;
    private __headers: HttpHeaders;

    constructor(private http: HttpClient){}

    createAuthorizationHeader(): HttpHeaders {
        if (this.__headers === null) {
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', this. _authToken || '');
          this.__headers= headers;
        }
        return this.__headers;
     }

    findAll(search?: string): Observable<Context[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Context[]>(`${BACKEND_API}/context`, {headers: this.createAuthorizationHeader(), params: params})
    }

    findById(id: string): Observable<Context> {
        return this.http.get<Context>(`${BACKEND_API}/context/${id}`)
    }

    save(context: Context): Observable<Context> {
        return this.http.post<Context>(`${BACKEND_API}/context/`, context)
    }

    update(context: Context): Observable<Context> {
        if (context.id !== undefined) {
            return this.http.put<Context>(`${BACKEND_API}/context/${context.id}`, context)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/context/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }