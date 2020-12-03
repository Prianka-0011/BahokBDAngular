import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../userservice/user.service';
import { ToastrService } from 'ngx-toastr';
////import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
/** register component*/
export class RegisterComponent implements OnInit {
  /** register ctor */
  constructor(private service: UserService, private http: HttpClient, private toastr: ToastrService) {

    }
  ngOnInit() {
    this.service.formModel.reset();
  }
   onSubmit() {
     this.service.register().subscribe(
   
       (res: any) => {
         console.log("reg",res)
        if (res.Succeeded)//Here I make speling mistake that why I caught a undefine error
        {
          this.service.formModel.reset();
          this.toastr.success('Register', 'Successfully');

        }
        else {
          //Here I make speling mistake that why I caught a undefine error
          !!res.Errors && res.Errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
               this.toastr.error('Username is already taken', 'Registration failed.');
                break;
              default:
               this.toastr.error(element.description, 'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      })
  }

}
