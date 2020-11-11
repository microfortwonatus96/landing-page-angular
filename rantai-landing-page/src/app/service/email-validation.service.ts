import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor(
    private http: HttpClient
  ) { }

  validateUser(id: string, token: string){
    return this.http.get(`http://192.168.88.88:7781/api/validation/token?id=${id}&token=${token}`)
  }
}
