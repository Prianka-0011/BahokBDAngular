import { Injectable } from '@angular/core';
import { Payment } from './payment.class';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService {
  formData: Payment = {
    Id: null,
    Type: null,
  
  }
  readonly rootURL = 'https://localhost:44393/api';
  list: Payment[];
  constructor(private http: HttpClient) {

  }
  postPaymentTypeDetail() {
    return this.http.post(this.rootURL + '/PaymentTypes/PostPayment', this.formData);
  }
  putPaymentTypeDetail() {
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.Id, this.formData);
  }
  deletePaymentTypeDetail(id) {
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }
  refreshList() {
    this.http.get(this.rootURL + '/PaymentTypes/GetPayment')
      .toPromise()
      .then(res => this.list = res as Payment[]);
  }
}
