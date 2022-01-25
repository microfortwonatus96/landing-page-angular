import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Galery } from '../models/galery.model';

@Injectable({
  providedIn: 'root',
})
export class GaleryService {
  constructor(private http: HttpClient) {}

  getGalery(): Observable<Galery[]> {
    // return this.http.get<Galery[]>(
    //   `${environment.api_galery}/testimoni/directory`
    // );
    return this.http.get<Galery[]>(
      `${environment.api_galery}/testimoni`
    );
  }
}
