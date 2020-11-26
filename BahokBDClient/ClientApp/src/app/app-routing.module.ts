import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthorizeGuard } from './api-authorization/authorize.guard';



const routes: Routes = [
  { path: '', redirectTo: 'bahok', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)/*, canActivate: [AuthorizeGuard]*/ }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
