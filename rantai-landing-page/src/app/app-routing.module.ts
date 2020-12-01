import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'activate/:token/:id', component: ActivateComponent },
  { path: 'reset/:token/:id', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
