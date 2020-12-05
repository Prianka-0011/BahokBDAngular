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
  //routingNoByBranchId() {
  //  var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  //  // console.log("promice", toPromise())
  //  return this.http.get(this.rootURL + '/Marchents/' + this.selectBranchId, { headers: tokenHader })
  //    //.toPromise().then(res => _this.routingNo = res);
  // // console.log("this.routingNo ", _this.routingNo )
  //}
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      FullName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Phone: this.formModel.value.Phone,
      Image: this.imageFileToUpload,
      Logo: this.logoFileToUpload,
      BusinessName: this.formModel.value.BusinessName,
      BusinessLink: this.formModel.value.BusinessLink,
      BusinessAddress: this.formModel.value.BusinessAddress,
      AccountName: this.formModel.value.AccountName,
      AccountNumber: this.formModel.value.AccountNumber,
      PayTypeId: this.formModel.value.PayTypeId,
      PayBankId: this.formModel.value.PayBankId,
      BranchId: this.formModel.value.BranchId,
      RoutingName: this.formModel.value.RoutingName,
      
    }
    console.log("body", body)
    return this.http.post(this.rootURL + '/Marchents', body);
  }
}
