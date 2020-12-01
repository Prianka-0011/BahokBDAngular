import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  
  constructor(private http: HttpClient) {

  }
 
  formData: Payment;
  readonly rootURL = 'http://localhost:51846/api';
  list: Payment[];
  postPaymentTypeDetail(formData) {
    //console.log('Post111',this.rootURL + '/PaymentTypes', this.formData);
    //var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.rootURL + '/PaymentTypes', formData/*, { headers: tokenHader }*/);
  }
  putPaymentTypeDetail() {
   
    return this.http.put(this.rootURL + '/PaymentTypes/' + this.formData.Id, this.formData);
  }
  deletePaymentTypeDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentTypes/' + id);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
      .toPromise()
      .then(res => this.list = res as Payment[]);
  }
}
