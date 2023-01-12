import { NgModule } from '@angular/core';
import { HomeRoutingModule } from 'src/home/home-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
