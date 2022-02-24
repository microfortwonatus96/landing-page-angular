import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

  { path: 'privacy', component: PrivacyComponent },
  { path: 'activate/:token/:id', component: ActivateComponent },
  { path: 'reset/:token/:id', component: ResetPasswordComponent },
  { path: 'referral-rangking', component: ReferralCodeComponent },
  { path: 'testimoni/view-all', component: ViewAllComponent },
  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
