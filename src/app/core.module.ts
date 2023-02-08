import { NgModule } from '@angular/core';
import { AuthInterceptorServer } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServer,
      multi: true,
    },
    // LoggingService
  ],
})
export class CoreModule {}
