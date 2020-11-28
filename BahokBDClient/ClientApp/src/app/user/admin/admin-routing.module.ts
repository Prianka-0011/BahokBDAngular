import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  //children: [
  //  { path: '', component: RegisterComponent },
  //  { path: 'user', component: UserComponent },
  //  { path: 'user/register', component: RegisterComponent },
  //  { path: 'user/login', component: LoginComponent },
  //  { path: 'user/test', component: TestComponent },
  //  { path: 'user/admin', component: AdminComponent, canActivate: [AuthGuard] },
  //  //{ path: 'user/admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)/*, canActivate: [AuthGuard]*/ }
  //]
}]

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
export const AdminRoutedComponents = [
  AdminComponent
];
