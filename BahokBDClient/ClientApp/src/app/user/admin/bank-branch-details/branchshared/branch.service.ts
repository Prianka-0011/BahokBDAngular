import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Branch } from './branch.model';
import { GetBank } from './get-bank.model';

@Injectable({ providedIn: 'root' })
export class BranchService {
  constructor(private http: HttpClient) {

  }
  branchList;
  formData: Branch;
  bankList;
  readonly rootURL = 'http://localhost:51846/api';
  paymentbankList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentBanks/getBankBranch', { headers: tokenHader })
      .toPromise().then(res => this.bankList = res);
      console.log("payment", this.bankList)
  }
  postBankBranchDetail() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    console.log("pikuformdata", this.formData)
    return this.http.post(this.rootURL + '/BankBranches', this.formData, { headers: tokenHader });
  }
  putBankBranchDetaill() {
    console.log("putBank", this.formData)
    return this.http.put(this.rootURL + '/BankBranches/' + this.formData.Id, this.formData);
  }
  deletePaymentBankDetail(id) {
    return this.http.delete(this.rootURL + '/BankBranches/' + id);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/BankBranches/getBranch', { headers: tokenHader })
      .toPromise().then(res => this.branchList = res);


  }
}
