import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branchshared/branch.service';
import { ToastrService } from 'ngx-toastr';
import { Branch } from '../branchshared/branch.model';

@Component({
    selector: 'app-bank-branch-list',
    templateUrl: './bank-branch-list.component.html',
    styleUrls: ['./bank-branch-list.component.scss']
})
/** bank-branch-list component*/
export class BankBranchListComponent implements OnInit {
  /** bank-branch-list ctor */
  constructor(public service: BranchService,
    private toastr: ToastrService) {

    }
    ngOnInit(): void {
      this.service.refreshList();
  }
  populateForm(pd: Branch) {
    this.service.formData = Object.assign({}, pd);
    console.log("this.service.formData", this.service.formData)
  }
  onDelete(Id) {
    if (this.toastr.warning('Are you want to delete')) {
      this.service.deletePaymentBankDetail(Id)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', ' Branch Detail Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}
