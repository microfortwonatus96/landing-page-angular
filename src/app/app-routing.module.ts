import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
// import { AgreementsComponent } from './agreements/agreements.component';
// import { FaqComponent } from './faq/faq.component';
import { LandingPageV2Component } from './landing-page-v2/landing-page-v2.component';
// import { LandingPageComponent } from './landing-page/landing-page.component';
// import { PrivacyComponent } from './privacy/privacy.component';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  // { path: '', component: LandingPageComponent },
  { path: '', component: LandingPageV2Component },
  { path: 'activate/:token/:id', component: ActivateComponent },
  { path: 'reset/:token/:id', component: ResetPasswordComponent },
  { path: 'referral-rangking', component: ReferralCodeComponent },
  { path: 'testimoni/view-all', component: ViewAllComponent },
  // { path: 'agreements', component: AgreementsComponent },
  // { path: '**', component: LandingPageComponent },
  { path: '**', component: LandingPageV2Component },
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
