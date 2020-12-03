import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paymenttypes } from './paymenttypes.model';
import { Banking } from './banking.model';

@Injectable({ providedIn: 'root' })
export class BankingService {
  constructor(private http: HttpClient) {

  }
  readonly rootURL = 'http://localhost:51846/api';
  formData = {
    Id:"",
    TypeId: "",
    Name:''
  };
  typelist: Paymenttypes[];
  list: Banking[];
  paymentsType() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
      .toPromise()
      .then(res => this.typelist = res as Paymenttypes[]);
  }
  postPaymentBankDetail(formData) {
    //console.log('Post111',this.rootURL + '/PaymentTypes', this.formData);
    //var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.rootURL + '/PaymentBanks/postBank', formData/*, { headers: tokenHader }*/);
  }
  putPaymentBankDetail() {

    return this.http.put(this.rootURL + '/PaymentBanks/putBank' + this.formData.Id, this.formData);
  }
  //deletePaymentBankDetail(id) {
  //  return this.http.delete(this.rootURL + '/PaymentBank/deletepaymentBank' + id);
  //}
  getBankList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
   // console.log("promice", toPromise())
    return this.http.get(this.rootURL + '/PaymentBanks/getBank', { headers: tokenHader })
      .toPromise();
    
      
  }
}
