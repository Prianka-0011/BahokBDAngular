import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  readonly rootURL = 'http://localhost:51846/api';
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Phone: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],// Here i make mistake in braket []
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.comparePasswords })
  });
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Phone: this.formModel.value.Phone,
      Password: this.formModel.value.Passwords.Password
    }
    console.log("body", body)
    return this.http.post(this.rootURL + '/ApplicationUser/Register', body);
  }
  login(formData) {
    console.log("login", formData)
    return this.http.post(this.rootURL + '/ApplicationUser/Login', formData);
  }
}
