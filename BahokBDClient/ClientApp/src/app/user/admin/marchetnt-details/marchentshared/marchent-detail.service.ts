import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Marchentdetail } from './marchentdetail';

@Injectable({ providedIn: 'root' })
export class MarchentDetailService {
  constructor(private fb: FormBuilder, private http: HttpClient) {

  }
  marchentList;
  marchent: Marchentdetail;
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

  paymentsType() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
      .toPromise()
      .then(res => this.typelist = res);
    console.log("")
  }
  bankListByTypeId() {  
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    console.log("promice", this.selectTypeId)
    this.http.get(this.rootURL + '/PaymentBanks/' + this.selectTypeId, { headers: tokenHader })
      .toPromise().then(res => this.bankList = res);
  }
  branchListByTypeId() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/BankBranches/' + this.selectBankId, { headers: tokenHader })
      .toPromise().then(res => this.branchList = res);
  }
  putMarchentDetaill() {
    //return this.http.put(this.rootURL + '/Marchents/' + this.marchent.Id, this.marchent);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/Marchents', { headers: tokenHader })
      .toPromise()
      .then(res => this.marchentList = res);
    console.log("marchentList", this.marchentList)
  }
  register() {
    const formData = new FormData();
    formData.append('Id', this.marchent.Id);
    formData.append('UserName', this.marchent.UserName);
    formData.append('FullName', this.marchent.FullName);
    formData.append('Email', this.marchent.Email);
    formData.append('Phone', this.marchent.Phone);
    formData.append('Image', this.imageFileToUpload, this.imageFileToUpload.name);
    formData.append('Logo', this.logoFileToUpload, this.logoFileToUpload.name);
    formData.append('BusinessName', this.marchent.BusinessName);
    formData.append('BusinessLink', this.marchent.BusinessLink);
    formData.append('BusinessAddress', this.marchent.BusinessAddress);
    formData.append('AccountName', this.marchent.AccountName);
    formData.append('AccountNumber', this.marchent.AccountNumber);
    formData.append('PayTypeId', this.selectTypeId);
    formData.append('PayBankId', this.selectBankId);
    formData.append('BranchId', this.marchent.BranchId);
    formData.append('RoutingName', this.marchent.RoutingName);
    console.log("formData", formData)
    return this.http.post(this.rootURL + '/MarchentDetails', this.marchent);
  }
}
