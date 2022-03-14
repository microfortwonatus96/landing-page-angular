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
  getImageByFilename(filename: string): string {
    // console.log('get image filename ' , filename)
    let url = `${environment.api_testimoni}/api/file/image?directory=${filename}`;
    // console.log('build url ' , url)
    return url;
  }
  async getBase64ImageFromUrl(imageUrl) {
    // console.log('image url  ', imageUrl)
    let res = await fetch(imageUrl);
    let blob = await res.blob();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
