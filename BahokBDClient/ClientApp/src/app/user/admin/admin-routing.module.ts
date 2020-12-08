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
import { BankBranchDetailComponent } from './bank-branch-details/bank-branch-detail/bank-branch-detail.component';
import { BankBranchListComponent } from './bank-branch-details/bank-branch-list/bank-branch-list.component';
import { ChargeDetailsComponent } from './charge-details/charge-details.component';
import { ChargeListComponent } from './charge-details/charge-list/charge-list.component';
import { ChargeDetailComponent } from './charge-details/charge-detail/charge-detail.component';
import { MarchetntDetailsComponent } from './marchetnt-details/marchetnt-details.component';
import { MarchentListComponent } from './marchetnt-details/marchent-list/marchent-list.component';
import { MarchenDetailComponent } from './marchetnt-details/marchen-detail/marchen-detail.component';



const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'admin/typedetails', component: PaymentTypeDetailsComponent },
    { path: 'admin/bankdetail', component: PaymentBankingDetailsComponent },
    { path: 'admin/branchdetail', component: BankBranchDetailsComponent },
    { path: 'admin/charge', component: ChargeDetailsComponent },
    { path: 'admin/marchent', component: MarchetntDetailsComponent },
    
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
  BankBranchDetailsComponent,
  BankBranchDetailComponent,
  BankBranchListComponent,
  ChargeDetailsComponent,
  ChargeListComponent,
  ChargeDetailComponent,
  MarchentListComponent,
  MarchetntDetailsComponent,
  MarchenDetailComponent
];
