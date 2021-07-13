import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ResultsComponent} from './components/results/results.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrandingFooterComponent} from './components/sub-components/branding-footer/branding-footer.component';
import {ApplicationComponent} from './components/application/application.component';
import {FormOpioidComponent} from './components/sub-components/forms/form-opioid/form-opioid.component';
import {FormFentanylComponent} from './components/sub-components/forms/form-fentanyl/form-fentanyl.component';
import {FormBuprenorphineComponent} from './components/sub-components/forms/form-buprenorphine/form-buprenorphine.component';
import {FormConversionToComponent} from './components/sub-components/forms/form-conversion-to/form-conversion-to.component';
import {OpioidService} from './components/shared/services/opioid/opioid.service';
import {FormsService} from './components/shared/services/form/forms.service';
import {InfoModalComponent} from './components/sub-components/info-modal/info-modal.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ResultsService} from './components/shared/services/results/results.service';
import {TotalDailyDoseService} from './components/shared/services/calculations/total.daily.dose.service';
import {MorphineEquivalentService} from './components/shared/services/calculations/morphine.equivalent.service';
import {CalculationsService} from './components/shared/services/calculations/calculations.service';
import {ResultsOpioidInfoComponent} from './components/sub-components/results/results-opioid-info/results-opioid-info.component';
import {ResultsConversionToComponent} from './components/sub-components/results/results-conversion-to/results-conversion-to.component';
import {ResultsSumUpComponent} from './components/sub-components/results/results-sum-up/results-sum-up.component';
import {OpioidConversionToComponent} from './components/sub-components/conversion-to/opioid-conversion-to/opioid-conversion-to.component';
import {MethadoneConversionToComponent} from './components/sub-components/conversion-to/methadone-conversion-to/methadone-conversion-to.component';
import {PlasterListComponent} from './components/sub-components/conversion-to/plaster-list/plaster-list.component';
import {ResultsGlpharmaInfoComponent} from './components/sub-components/results/results-glpharma-info/results-glpharma-info.component';
import {RescueDoseComponent} from './components/sub-components/conversion-to/rescue-dose/rescue-dose.component';
import {ContentService} from './components/shared/services/content/content.service';
import {KidneyFailureComponent} from './components/sub-components/forms/kidney-failure/kidney-failure.component';
import {DatabaseService} from './components/shared/services/database/database.service';
import {HttpClientModule} from '@angular/common/http';
import {ResultsForDatabaseService} from './components/shared/services/database/results.for.database.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    BrandingFooterComponent,
    FormBuprenorphineComponent,
    FormConversionToComponent,
    FormFentanylComponent,
    FormOpioidComponent,
    InfoModalComponent,
    KidneyFailureComponent,
    MethadoneConversionToComponent,
    OpioidConversionToComponent,
    RescueDoseComponent,
    ResultsComponent,
    ResultsConversionToComponent,
    ResultsGlpharmaInfoComponent,
    ResultsOpioidInfoComponent,
    ResultsSumUpComponent,
    PlasterListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    CalculationsService,
    ContentService,
    DatabaseService,
    FormsService,
    MorphineEquivalentService,
    OpioidService,
    ResultsForDatabaseService,
    ResultsService,
    TotalDailyDoseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
