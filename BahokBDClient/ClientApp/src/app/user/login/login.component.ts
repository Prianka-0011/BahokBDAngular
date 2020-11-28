import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** login component*/
export class LoginComponent implements OnInit {
/** login ctor */
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private toastr: ToastrService, private service: UserService, private router: Router) {

    }
    ngOnInit(): void {
      if (localStorage.getItem != null) {
        //this.router.navigateByUrl('/admin');
      }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/admin');
      },
      err => {
        if (err.status == 400) {
          this.toastr.error('Incurrect username or password', 'Authentication faild')
        }
        else {
          console.log(err);
        }
      }
    );
  }
}
