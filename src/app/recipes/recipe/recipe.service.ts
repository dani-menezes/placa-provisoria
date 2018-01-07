import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { Recipe } from 'app/recipes/recipe/recipe.model'
import { BACKEND_API } from '../../app.backend-api'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class RecipeService {

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

    findAll(search?: string): Observable<Recipe[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Recipe[]>(`${BACKEND_API}/recipe`, {headers: this.createAuthorizationHeader(), params: params})
    }

    findById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${BACKEND_API}/recipe/${id}`)
    }

    save(Recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${BACKEND_API}/recipe/`, Recipe)
    }

    update(Recipe: Recipe): Observable<Recipe> {
        if (Recipe.id !== undefined) {
            return this.http.put<Recipe>(`${BACKEND_API}/recipe/${Recipe.id}`, Recipe)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/recipe/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }