import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITestimoni, Testimoni } from '../models/Testimoni.model';

@Injectable({
  providedIn: 'root',
})
export class TestimoniService {
  constructor(private http: HttpClient) {}

  getTestimoni(): Observable<ITestimoni[]> {
    return this.http.get<ITestimoni[]>(
      `${environment.api_testimoni}/winner-event`
    );
  }
}
