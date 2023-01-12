import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerInterceptor } from 'src/core/interceptors/bearer.intercepter';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
