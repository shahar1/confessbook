import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})
export class ConfessionsService {

   serverUrl:string =  'http://localhost:3000';
  constructor(private http: HttpClient) { }

  postConfesion(confesion:string): Observable<any>{
    return this.http.post<any>(`${this.serverUrl}/confessions`,{message: confesion}, httpOptions);
  }
  login(data:Object): Observable<any>{
      return this.http.post<any>(`${this.serverUrl}/login`,data, httpOptions);
  }
}