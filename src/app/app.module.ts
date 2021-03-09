import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ResultsComponent} from './components/results/results.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrandingFooterComponent} from './components/sub-components/branding-footer/branding-footer.component';
import {ApplicationComponent} from './components/application/application.component';
import {FormOpioidComponent} from './components/sub-components/form-opioid/form-opioid.component';
import {FormFentanylComponent} from './components/sub-components/form-fentanyl/form-fentanyl.component';
import {FormBuprenorphineComponent} from './components/sub-components/form-buprenorphine/form-buprenorphine.component';
import {FormConversionToComponent} from './components/sub-components/form-conversion-to/form-conversion-to.component';
import {DrugService} from './components/shared/services/drug.service';
import {FormsService} from './components/shared/services/forms.service';
import {InfoModalComponent} from './components/sub-components/info-modal/info-modal.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';
import {ResultsService} from './components/shared/services/results.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    ApplicationComponent,
    BrandingFooterComponent,
    FormOpioidComponent,
    FormFentanylComponent,
    FormBuprenorphineComponent,
    FormConversionToComponent,
    InfoModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    DrugService,
    FormsService,
    CookieService,
    ResultsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
