import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ActivateComponent } from './activate/activate.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FaqComponent } from './faq/faq.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { LandingPageV2Component } from './landing-page-v2/landing-page-v2.component';
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
    PrivacyComponent,
    ActivateComponent,
    ResetPasswordComponent,
    ReferralCodeComponent,
    FaqComponent,
    ViewAllComponent,
    HelpCenterComponent,
    AgreementsComponent,
    LandingPageV2Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatChipsModule,
    MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ModuleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MatButtonModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
