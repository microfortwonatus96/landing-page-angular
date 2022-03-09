import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Testimoni } from '../models/Testimoni.model';

@Injectable({
  providedIn: 'root',
})
export class TestimoniService {
  constructor(private http: HttpClient) {}

  getTestimoni(): Observable<Testimoni[]> {
    return this.http.get<Testimoni[]>(
      `${environment.api_testimoni}/winner-event`
    );
  }
}
