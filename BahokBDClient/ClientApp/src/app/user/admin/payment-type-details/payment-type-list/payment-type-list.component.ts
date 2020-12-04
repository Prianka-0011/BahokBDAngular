import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Payment } from '../shared/payment.model';
import { PaymentService } from '../shared/payment.service';


@Component({
    selector: 'app-payment-type-list',
    templateUrl: './payment-type-list.component.html',
    styleUrls: ['./payment-type-list.component.scss']
})
/** payment-type-list component*/
export class PaymentTypeListComponent {
  /** payment-type-list ctor */
  constructor(public service: PaymentService,
    private toastr: ToastrService) {

  }
  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: Payment) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(Id) {
    if (this.toastr.warning('Are you want to delete')) {
      this.service.deletePaymentTypeDetail(Id)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}
