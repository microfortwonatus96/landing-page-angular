import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor(
    private http: HttpClient
  ) { }

  validateUser(id: string, token: string): Observable<any>{
    return this.http.get<any>(`http://rantai.tech:7781/api/validation/token?id=${id}&token=${token}`)
  }
}
