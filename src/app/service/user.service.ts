import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProvince } from '../models/province.model';
import { AppInitService } from './appinit.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private initService: AppInitService) {}

  getProvince(): Observable<IProvince[]> {
    return this.http.get<IProvince[]>(
      `${this.initService.baseUrl}/api/user/check/province`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
