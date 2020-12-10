import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MarchentDetailService } from '../marchentshared/marchent-detail.service';

@Component({
    selector: 'app-marchent-list',
    templateUrl: './marchent-list.component.html',
    styleUrls: ['./marchent-list.component.scss']
})
/** marchent-list component*/
export class MarchentListComponent implements OnInit {
  /** marchent-list ctor */
  constructor(public service: MarchentDetailService, private toastr: ToastrService) {

  }
    ngOnInit(): void {
      this.service.refreshList();
  }
  populateForm(pd) {
    this.service.marchent = Object.assign({}, pd);
    console.log("this.service.marchent", this.service.marchent)
  }

}
