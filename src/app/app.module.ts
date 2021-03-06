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

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    ApplicationComponent,
    BrandingFooterComponent,
    FormOpioidComponent,
    FormFentanylComponent,
    FormBuprenorphineComponent,
    FormConversionToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DrugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
