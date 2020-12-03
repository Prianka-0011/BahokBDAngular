import { Component, OnInit } from '@angular/core';
import { BankingService } from '../bankshared/banking.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type } from '@angular/compiler/src/core';

@Component({
    selector: 'app-payment-banking-detail',
    templateUrl: './payment-banking-detail.component.html',
    styleUrls: ['./payment-banking-detail.component.scss']
})
/** payment-banking-detail component*/
export class PaymentBankingDetailComponent implements OnInit {
  /** payment-banking-detail ctor */
  constructor(public service: BankingService, private toastr: ToastrService) {

  }
    ngOnInit() {
      this.service.paymentsType();
      this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: "",
      Name: '',
      TypeId: "",
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.Id == "") {

      this.insertRecord(form);
    }

    else
      console.log("Id Guid", this.service.formData.Id)
    this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentBankDetail(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
        this.service.paymentsType();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentBankDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.service.paymentsType();
      },
      err => {
        console.log(err);
      }
    )
  }

}
