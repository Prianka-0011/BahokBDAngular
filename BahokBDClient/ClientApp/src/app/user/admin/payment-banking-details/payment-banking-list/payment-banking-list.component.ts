import { Component, OnInit } from '@angular/core';
import { BankingService } from '../bankshared/banking.service';
import { ToastrService } from 'ngx-toastr';
import { Banking } from '../bankshared/banking.model';
import { GetBank } from '../bankshared/get-bank.model';

@Component({
    selector: 'app-payment-banking-list',
    templateUrl: './payment-banking-list.component.html',
    styleUrls: ['./payment-banking-list.component.scss']
})
/** payment-banking-list component*/
export class PaymentBankingListComponent implements OnInit{
/** payment-banking-list ctor */
  bankList;
  constructor(private service: BankingService,
    private toastr: ToastrService,) {
  } ngOnInit() {
    this.refereshList();
  }
  refereshList() {
    this.service.getBankList().then(res => {
      this.bankList = res;
      console.log("probprianka", this.bankList);
    });
  }
  
    
  }

  //populateForm(pd: Banking) {
  //  this.service.formData = Object.assign({}, pd);
  //}

  //onDelete(Id) {
  //  if (this.toastr.warning('Are you want to delete')) {
  //    this.service.deletePaymentBankDetail(Id)
  //      .subscribe(res => {
  //        debugger;
  //        this.refreshList();
  //        this.toastr.warning('Deleted successfully', 'Payment Bank Detail Register');
  //      },
  //        err => {
  //          debugger;
  //          console.log(err);
  //        })
  //  }
  //}

