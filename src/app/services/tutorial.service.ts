import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';




const baseUrl = 'http://localhost:8000/api/tutorials'

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]>{       //Observable: ideas of invokable collection of future events or values.
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: any):Observable<Tutorial>{
    return this.http.get(baseUrl+"/"+id);
  }

  create(data:any):Observable<any>{
    return this.http.post(baseUrl,data);
  }

  update(id:any, data:any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  delete(id:any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any>{
    return this.http.delete(baseUrl);
  }

  findByTitle(title:string):Observable<Tutorial[]>{
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }


  
}
