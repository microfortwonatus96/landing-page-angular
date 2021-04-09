import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'activate/:token/:id', component: ActivateComponent },
  { path: 'reset/:token/:id', component: ResetPasswordComponent },
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
