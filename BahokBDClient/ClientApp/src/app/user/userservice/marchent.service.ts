import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Paymenttypes } from '../admin/payment-banking-details/bankshared/paymenttypes.model';
import { Branch } from '../admin/bank-branch-details/branchshared/branch.model';

@Injectable({ providedIn: 'root' })
export class MarchentService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  readonly rootURL = 'http://localhost:51846/api';
  imageFileToUpload: File = null;
  logoFileToUpload: File = null;
  selectTypeId: any = null;
  hideBranch: boolean = false;
  selectBankId: string = '';
  selectBranchId: string = '';
  typelist;
  bankList;
  branchList;
  routingNo;
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    FullName: ['', Validators.required],
    Email: ['', Validators.email],
    Phone: [''],
    BusinessName: [''],
    BusinessLink: [''],
    BusinessAddress: [''],
    AccountName: [''],
    AccountNumber: [''],
    PayTypeId: [''],
    PayBankId: [''],
    BranchId: [''],
    RoutingName: [''],
   
  });

  paymentsType() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
      .toPromise()
      .then(res => this.typelist = res );
    console.log("")
  }
  bankListByTypeId() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/PaymentBanks/'+ this.selectTypeId, { headers: tokenHader })
      .toPromise().then(res => this.bankList = res);
  }
  branchListByTypeId() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/BankBranches/' + this.selectBankId, { headers: tokenHader })
      .toPromise().then(res => this.branchList = res);
  }
  register() {
    const formData = new FormData();
    formData.append('UserName', this.formModel.value.UserName);
    formData.append('FullName', this.formModel.value.FullName);
    formData.append('Email', this.formModel.value.Email);
    formData.append('Phone', this.formModel.value.Phone);
    formData.append('Image', this.imageFileToUpload, this.imageFileToUpload.name);
    formData.append('Logo', this.logoFileToUpload, this.logoFileToUpload.name);
    formData.append('BusinessName', this.formModel.value.BusinessName);
    formData.append('BusinessLink', this.formModel.value.BusinessLink);
    formData.append('BusinessAddress', this.formModel.value.BusinessAddress);
    formData.append('AccountName', this.formModel.value.AccountName);
    formData.append('AccountNumber', this.formModel.value.AccountNumber);
    formData.append('PayTypeId', this.formModel.value.PayTypeId);
    formData.append('PayBankId', this.formModel.value.PayBankId);
    formData.append('BranchId', this.formModel.value.BranchId);
    formData.append('RoutingName', this.formModel.value.RoutingName);
    return this.http.post(this.rootURL + '/Marchents', formData);
  }
}
