import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountdownEventService {
  constructor() {}
  secondsToDhms(seconds) {
    seconds = Number(seconds);
    var countDownDate = new Date(seconds * 1000).getTime();
    var now = new Date().getTime();
    var waktu = countDownDate - now;
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
