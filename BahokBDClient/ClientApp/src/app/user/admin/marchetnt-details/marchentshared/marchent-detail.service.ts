import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MarchentDetailService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  marchentList;
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
  formModel = this.fb.group({
    UserName: [''],
    FullName: [''],
    Email: [''],
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
      .then(res => this.typelist = res);
    console.log("")
  }
  bankListByTypeId() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/PaymentBanks/' + this.selectTypeId, { headers: tokenHader })
      .toPromise().then(res => this.bankList = res);
  }
  branchListByTypeId() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/BankBranches/' + this.selectBankId, { headers: tokenHader })
      .toPromise().then(res => this.branchList = res);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/Marchents', { headers: tokenHader })
      .toPromise()
      .then(res => this.marchentList = res);
    console.log("marchentList", this.marchentList)
  }
}
