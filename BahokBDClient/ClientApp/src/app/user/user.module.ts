import { NgModule } from '@angular/core';
import { RoutedComponents, UserRoutingModule } from './user-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgZorroAntdModule, NzLayoutModule, NzIconModule } from 'ng-zorro-antd';
import { UserComponent } from './user.component';
import { UserService } from './userservice/user.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentService } from './admin/payment-type-details/shared/payment.service';


@NgModule({
  declarations: [
    ...RoutedComponents
  ],
  imports: [
    UserRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, PaymentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ],
  bootstrap: [UserComponent]
})
export class UserModule {
}
