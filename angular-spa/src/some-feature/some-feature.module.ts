import { NgModule } from '@angular/core';
import { WeatherComponent } from './components/weather/weather.component';
import { SomeFeatureRoutingModule } from 'src/some-feature/some-feature-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    SharedModule,
    SomeFeatureRoutingModule
  ]
})
export class SomeFeatureModule { }
