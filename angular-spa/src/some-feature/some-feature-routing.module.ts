import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from 'src/some-feature/components/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class SomeFeatureRoutingModule { }