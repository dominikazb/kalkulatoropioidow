import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplicationComponent} from './components/application/application.component';
import {ResultsComponent} from './components/results/results.component';

const routes: Routes = [
  {path: '', component: ApplicationComponent},
  {path: 'results', component: ResultsComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
