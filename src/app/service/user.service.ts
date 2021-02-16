import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProspectiveCustomer } from '../models/prospective-customer.model';
import { IProvince } from '../models/province.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProvince(): Observable<IProvince[]> {
    return this.http.get<IProvince[]>(
      `${environment.api_server}/api/user/check/province`
    );
  }

  createProspectiveCustomer(prospectiveCustomer: IProspectiveCustomer) {
    return this.http.post(
      `${environment.api_support}/api/form-landing`,
      prospectiveCustomer
    );
  }
}
