import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  constructor(private http: HttpClient) {}

  validateUser(id: string, token: string): Observable<any> {
    return this.http.get<any>(
      `${environment.api_server}/api/validation/token?rantaiId=${id}&token=${token}`
    );
  }

  updatePassword(id: string, password: string, token: string) {
    return this.http.post(
      `${environment.api_server}/api/validation/updatepass?rantaiId=${id}&password=${password}&token=${token}`,
      null
    );
  }
}
