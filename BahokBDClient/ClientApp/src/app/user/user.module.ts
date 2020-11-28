import { NgModule } from '@angular/core';
import { RoutedComponents, UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgZorroAntdModule, NzLayoutModule, NzIconModule } from 'ng-zorro-antd';
import { UserComponent } from './user.component';
import { UserService } from './userservice/user.service';
//import { ToastrModule } from 'ngx-toastr';

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
   // ToastrModule
  ],
  providers: [UserService],
  bootstrap: [UserComponent]
})
export class UserModule {
}
