import { Component } from '@angular/core';
import { ChargeService } from '../chargeshared/charge.service';
import { ToastrService } from 'ngx-toastr';
import { Charge } from '../chargeshared/charge.model';

@Component({
    selector: 'app-charge-list',
    templateUrl: './charge-list.component.html',
    styleUrls: ['./charge-list.component.scss']
})
/** charge-list component*/
export class ChargeListComponent {
  /** charge-list ctor */
  constructor(public service: ChargeService,
    private toastr: ToastrService) {

  } ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: Charge) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(Id) {
    if (this.toastr.warning('Are you want to delete')) {
      this.service.deleteChargeDetail(Id)
        .subscribe(res => {
          debugger;
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Charge Detail ');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }
}
