import { Component, OnInit } from '@angular/core';
import { MarchentDetailService } from '../marchentshared/marchent-detail.service';

@Component({
    selector: 'app-marchen-detail',
    templateUrl: './marchen-detail.component.html',
    styleUrls: ['./marchen-detail.component.scss']
})
/** marchen-detail component*/
export class MarchenDetailComponent implements OnInit {
    /** marchen-detail ctor */
  imageUrl: string = "/assets/images/noimage.png";
  logoUrl: string = "/assets/images/noimage.png";

  constructor(public service: MarchentDetailService) {
    //const _this = this;
    //this.service.routingNoByBranchId().subscribe(res => {
    //  this.service.routingNo = res;
    //});
    //this.service.routingNoByBranchId().subscribe(res => {
    //  _this.service.routingNo = res;
    //});
    //console.log("_this.service", _this.service.routingNo)
  }
  handleImgFileInput(file: FileList) {
    this.service.imageFileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.service.imageFileToUpload);
    console.log("imgfile", this.service.imageFileToUpload)
  }
  handleLogoFileInput(file: FileList) {
    this.service.logoFileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.logoUrl = event.target.result;
    }
    reader.readAsDataURL(this.service.logoFileToUpload);
    console.log("logofile", this.service.logoFileToUpload)
  }
  ngOnInit() {
    this.service.formModel.reset();
    this.service.paymentsType();
    console.log("select", this.service.selectTypeId)
  }
  getBankListByTypeId() {
    if (this.service.selectTypeId == 'beb41e1a-93aa-4745-8fa8-08d899fbb4b9') {
      this.service.hideBranch = true;
    }
    else {
      this.service.hideBranch = false;
    }
    this.service.bankListByTypeId();
  }
  getBranchListByTypeId() {
    this.service.branchListByTypeId();
  }
  
  //onSubmit() {
  //  this.service.register().subscribe(

  //    (res: any) => {
  //      console.log("reg", res)
  //    },
  //    err => {
  //      console.log(err);
  //    });
  //}
}
