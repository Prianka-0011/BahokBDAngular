import { NgModule } from '@angular/core';
import { AdminRoutingModule, AdminRoutedComponents } from './admin-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AdminComponent } from './admin.component';
import { PaymentService } from './payment-type-details/shared/payment.service';
import { BankingService } from './payment-banking-details/bankshared/banking.service';
import { BranchService } from './bank-branch-details/branchshared/branch.service';
import { MarchentDetailService } from './marchetnt-details/marchentshared/marchent-detail.service';


@NgModule({
  declarations: [
    ...AdminRoutedComponents
  ],
  imports: [
    AdminRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule,
    //ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PaymentService,
    BankingService,
    BranchService,
    MarchentDetailService

    
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
