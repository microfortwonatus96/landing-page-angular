import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReferralCode } from '../models/referral.model';

@Injectable({
  providedIn: 'root',
})
export class RefferalCodeService {
  constructor(private http: HttpClient) {}

  referralCode(pageSize: number, search?: string): Observable<IReferralCode[]> {
    let str = `${environment.api_referral}/public/api/rantai-referral-event/leaderboard?size=${pageSize}`;
    if (search && search.length) str = str + `&search=${search}`;
    return this.http.get<IReferralCode[]>(str);
  }
  currentEvent() {
    return this.http.get<IReferralCode[]>(
      `${environment.api_server}/api/referral/event`
    );
  }
  // getEvent() {
  //   return this.http.get(
  //     `${environment.api_referral}/api/rantai-referral-event/current-event`
  //   );
  // }

  findTimeServer() {
    return this.http.get<IReferralCode[]>(`${environment.api_server}/time`);
  }
}
