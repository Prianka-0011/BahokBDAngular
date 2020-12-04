import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BranchService {
  constructor(private http: HttpClient) {

  }
  branchList;
  readonly rootURL = 'http://localhost:51846/api';
  refreshList() {
    var tokenHader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // console.log("promice", toPromise())
    this.http.get(this.rootURL + '/BankBranches/getBranch', { headers: tokenHader })
      .toPromise().then(res => this.branchList = res);


  }
}
