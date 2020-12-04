import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branchshared/branch.service';
import { ToastrService } from 'ngx-toastr';

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
}
