import { Component } from '@angular/core';
import { ChargeService } from '../chargeshared/charge.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-charge-detail',
    templateUrl: './charge-detail.component.html',
    styleUrls: ['./charge-detail.component.scss']
})
/** charge-detail component*/
export class ChargeDetailComponent {
  /** charge-detail ctor */
  constructor(public service: ChargeService,
    private toastr: ToastrService) {

  } ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: "00000000-0000-0000-0000-000000000000",
      Location: "",
      BaseCharge: "",
      IncreaseChargePerKg: ""

    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.Id == "00000000-0000-0000-0000-000000000000") {

      this.insertRecord(form);
    }

    else {
      console.log("Id Guid", this.service.formData.Id)
      this.updateRecord(form);
    }

  }

  insertRecord(form: NgForm) {
    this.service.postChargeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully', 'Charge Detail Register');
        this.service.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putChargeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Charge Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
