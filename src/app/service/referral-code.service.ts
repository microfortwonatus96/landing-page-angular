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

  referralCode(pageSize: number): Observable<IReferralCode[]> {
    return this.http.get<IReferralCode[]>(
      `${environment.api_referral}/public/api/rantai-referral-event/leaderboard?size=${pageSize}`
    );
  }
  currentEvent() {
    return this.http.get<IReferralCode[]>(
      `${environment.api_referral}/api/rantai-referral-event/current-event`
    );
  }
  getEvent() {
    return this.http.get(
      `${environment.api_referral}/api/rantai-referral-event/current-event`
    );
  }
}
