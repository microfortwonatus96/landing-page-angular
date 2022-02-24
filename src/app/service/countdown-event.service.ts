import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountdownEventService {
  constructor() {}
  secondsToDhms(seconds: number, timeServer: number) {
    if (timeServer) {
      var countDownDate = new Date(seconds * 1000).getTime();
      var waktuServer = new Date(timeServer * 1000).getTime();
      var waktu = countDownDate - waktuServer;
      var d = Math.floor(waktu / (1000 * 60 * 60 * 24));
      var h = Math.floor((waktu % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var m = Math.floor((waktu % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((waktu % (1000 * 60)) / 1000);

      const obj = {
        day: d,
        hours: h,
        minutes: m,
        seconds: s,
      };

      return obj;
    }
  }
}
