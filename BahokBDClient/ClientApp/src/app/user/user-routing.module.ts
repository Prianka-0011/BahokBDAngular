import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [{
  path: '', component:UserComponent,
  children: [
    { path: '', component: RegisterComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/register', component: RegisterComponent },
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
  RegisterComponent
];

