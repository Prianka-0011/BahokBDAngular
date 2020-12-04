import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../branchshared/branch.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-bank-branch-detail',
    templateUrl: './bank-branch-detail.component.html',
    styleUrls: ['./bank-branch-detail.component.scss']
})
/** bank-branch-detail component*/
export class BankBranchDetailComponent implements OnInit {
  /** bank-branch-detail ctor */
  constructor(public service: BranchService,
    private toastr: ToastrService ) {

  }
  ngOnInit() {
    this.service.paymentbankList();
    this.resetForm();
    this.service.refreshList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: '00000000-0000-0000-0000-000000000000',
      Name: '',
      RoutingName: '',
      BankName: 'null',
      PaymentBankId:''
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.Id == '00000000-0000-0000-0000-000000000000') {
      console.log("formdatacheck", this.service.formData)
      this.insertRecord(form);

    }

    else {
      console.log("Id Guid", this.service.formData.Id)
      this.updateRecord(form);
    }

  }

  insertRecord(form: NgForm) {
    this.service.postBankBranchDetail().subscribe(
      res => {
        console.log("successres", res)
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Branch Detail Register');
        //this.service.paymentsType();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putBankBranchDetaill().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Submitted successfully', 'Branch Detail Register');
        //this.service.paymentsType();
      },
      err => {
        console.log(err);
      }
    )
  }

}
