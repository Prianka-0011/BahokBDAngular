import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'admin', component: AdminComponent },
    { path: 'admin/paytype', component: PaymentTypeComponent },
    
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
  PaymentTypeComponent
];
