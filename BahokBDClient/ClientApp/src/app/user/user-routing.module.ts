import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { TestComponent } from './test/test.component';
import { MarchentRegisterComponent } from './marchent-register/marchent-register.component';



const routes: Routes = [{
  path: '', component:UserComponent,
  children: [
    { path: '', component: MarchentRegisterComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/register', component: RegisterComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/test', component: TestComponent },
    { path: 'user/marchent', component: MarchentRegisterComponent },
    { path: 'user/admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]})
export class UserRoutingModule {
}
export const RoutedComponents = [
  UserComponent,
  RegisterComponent,
  LoginComponent,
  //AdminComponent,
  MarchentRegisterComponent,
  TestComponent
];

