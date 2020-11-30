import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PaymentTypeDetailsComponent } from './payment-type-details/payment-type-details.component';
import { PaymentTypeDetailComponent } from './payment-type-details/payment-type-detail/payment-type-detail.component';
import { PaymentTypeListComponent } from './payment-type-details/payment-type-list/payment-type-list.component';



const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'admin', component: AdminComponent },
    { path: 'admin/typedetails', component: PaymentTypeDetailsComponent },
    { path: 'admin/typedetails/typedetail', component: PaymentTypeDetailComponent },
    { path: '/typelist', component: PaymentTypeListComponent },
    
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
  PaymentTypeDetailComponent

 
];
