import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../shared/payment.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-payment-type-detail',
    templateUrl: './payment-type-detail.component.html',
    styleUrls: ['./payment-type-detail.component.scss']
})
/** payment-type-detail component*/
export class PaymentTypeDetailComponent implements OnInit {
  /** payment-type-detail ctor */
  constructor(private service: PaymentService,
    private toastr: ToastrService) {

  }
  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: '00000000-0000-0000-0000-000000000000',
      Type: '',

    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.Id == '00000000-0000-0000-0000-000000000000')
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentTypeDetail().subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.postPaymentTypeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
