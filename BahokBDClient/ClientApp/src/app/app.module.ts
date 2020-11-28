import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N, NgZorroAntdModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserModule } from './user/user.module';
import { UserService } from './user/userservice/user.service';
//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NzLayoutModule,
    NzIconModule,
    UserModule,
   // ToastrModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
