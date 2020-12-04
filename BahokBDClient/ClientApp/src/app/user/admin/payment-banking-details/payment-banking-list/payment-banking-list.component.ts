import { Component, OnInit } from '@angular/core';
import { BankingService } from '../bankshared/banking.service';
import { ToastrService } from 'ngx-toastr';
import { Banking } from '../bankshared/banking.model';


@Component({
  selector: 'app-payment-banking-list',
  templateUrl: './payment-banking-list.component.html',
  styleUrls: ['./payment-banking-list.component.scss']
})
/** payment-banking-list component*/
export class PaymentBankingListComponent implements OnInit {
  /** payment-banking-list ctor */
  bankList;
  constructor(public service: BankingService,
    private toastr: ToastrService,) {
  } ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: Banking) {
    this.service.formData = Object.assign({}, pd);
    console.log("this.service.formData", this.service.formData)
  }
  onDelete(Id) {
    if (this.toastr.warning('Are you want to delete')) {
      this.service.deletePaymentBankDetail(Id)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Bank Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}






