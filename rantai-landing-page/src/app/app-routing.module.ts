import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'privacy-policy', component: PrivacyComponent },
  { path: 'activate/:token/:id', component: ActivateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
