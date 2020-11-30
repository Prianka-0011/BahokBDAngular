import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  
  constructor(private http: HttpClient) {

  }
  formData: Payment;
  readonly rootURL = 'https://localhost:44393/api';
  list: Payment[];
  postPaymentTypeDetail() {
    //var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.post(this.rootURL + '/PaymentTypes/PostPayment', this.formData/*, { headers: tokenHader }*/);
  }
  putPaymentTypeDetail() {
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.Id, this.formData);
  }
  deletePaymentTypeDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    //this.http.get(this.rootURL + '/PaymentTypes/GetPayment', { headers: tokenHader })
    //  .toPromise()
    //  .then(res => this.list = res as Payment[]);
  }
}
