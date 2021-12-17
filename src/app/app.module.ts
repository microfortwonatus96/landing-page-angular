import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ActivateComponent } from './activate/activate.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
export function ModuleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';
  const options: IModuleTranslationOptions = {
    translateError: (error, path) => {
      console.log(error);
    },
    modules: [{ baseTranslateUrl }],
  };
  return new ModuleTranslateLoader(http, options);
}
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PrivacyComponent,
    ActivateComponent,
    ResetPasswordComponent,
    ReferralCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ModuleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
