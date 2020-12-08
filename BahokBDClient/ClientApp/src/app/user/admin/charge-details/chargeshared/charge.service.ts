import { Injectable } from '@angular/core';
import { Charge } from './charge.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChargeService {
  formData: Charge;
  readonly rootURL = 'http://localhost:51846/api';
  chargeList: Charge[];
  constructor(private http: HttpClient) {

  }
  postChargeDetail() {
    //console.log('Post111',this.rootURL + '/PaymentTypes', this.formData);
    //var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    console.log("charge", this.formData)
    var body = { ...this.formData };
    return this.http.post(this.rootURL + '/Charges', body/*, { headers: tokenHader }*/);
  }
  putChargeDetail() {

    return this.http.put(this.rootURL + '/Charges/' + this.formData.Id, this.formData);
  }
  deleteChargeDetail(id) {
    return this.http.delete(this.rootURL + '/Charges/' + id);
  }
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    this.http.get(this.rootURL + '/Charges', { headers: tokenHader })
      .toPromise()
      .then(res => this.chargeList = res as Charge[]);
    console.log("chargelist", this.chargeList)
  }
}
