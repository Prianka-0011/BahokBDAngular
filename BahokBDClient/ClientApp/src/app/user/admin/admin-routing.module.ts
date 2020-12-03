import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PaymentTypeDetailsComponent } from './payment-type-details/payment-type-details.component';
import { PaymentTypeDetailComponent } from './payment-type-details/payment-type-detail/payment-type-detail.component';
import { PaymentTypeListComponent } from './payment-type-details/payment-type-list/payment-type-list.component';
import { PaymentBankingDetailsComponent } from './payment-banking-details/payment-banking-details.component';
import { PaymentBankingListComponent } from './payment-banking-details/payment-banking-list/payment-banking-list.component';
import { PaymentBankingDetailComponent } from './payment-banking-details/payment-banking-detail/payment-banking-detail.component';
import { BankBranchDetailsComponent } from './bank-branch-details/bank-branch-details.component';



const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'admin/typedetails', component: PaymentTypeDetailsComponent },
    { path: 'admin/bankdetail', component: PaymentBankingDetailsComponent },
    { path: 'admin/branchdetail', component: BankBranchDetailsComponent },
    
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
export const AdminRoutedComponents = [
  AdminComponent,
  PaymentTypeListComponent,
  PaymentTypeDetailsComponent,
  PaymentTypeDetailComponent,
  PaymentBankingListComponent,
  PaymentBankingDetailComponent,
  PaymentBankingDetailsComponent,
  BankBranchDetailsComponent
];
