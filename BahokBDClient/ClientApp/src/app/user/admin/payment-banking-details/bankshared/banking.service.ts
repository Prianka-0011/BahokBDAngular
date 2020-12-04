import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paymenttypes } from './paymenttypes.model';
import { Banking } from './banking.model';

@Injectable({ providedIn: 'root' })
export class BankingService {
  constructor(private http: HttpClient) {

  }
  readonly rootURL = 'http://localhost:51846/api';
  formData: Banking;
  typelist: Paymenttypes[];
  bankList;
  list: Banking[];
  paymentsType() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
      .toPromise()
      .then(res => this.typelist = res as Paymenttypes[]);
  }
  postPaymentBankDetail() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    console.log("pikuformdata", this.formData)
    return this.http.post(this.rootURL + '/PaymentBanks', this.formData, { headers: tokenHader });
  }
  putPaymentBankDetail() {
    console.log("putBank", this.formData)
    return this.http.put(this.rootURL + '/PaymentBanks/'+ this.formData.Id, this.formData);
  }
  deletePaymentBankDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentBanks/'+ id);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
   // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/PaymentBanks/getBank', { headers: tokenHader })
      .toPromise().then(res => this.bankList=res);
    
      
  }
}
