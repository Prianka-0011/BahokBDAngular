import { Component, OnInit } from '@angular/core';
import { MarchentService } from '../userservice/marchent.service';

@Component({
  selector: 'app-marchent-register',
  templateUrl: './marchent-register.component.html',
  styleUrls: ['./marchent-register.component.scss']
})
/** marchent-register component*/
export class MarchentRegisterComponent implements OnInit {
  /** marchent-register ctor */
  imageUrl: string = "/assets/images/noimage.png";
  logoUrl: string = "/assets/images/noimage.png";

  constructor(public service: MarchentService) {
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
    if (this.service.selectTypeId == '93de69ac-2f15-48d2-d8ed-08d89748d7af') {
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
  getRoutingByTypeId() {
    //this.service.routingNoByBranchId();
  }
  onSubmit() {
    this.service.register().subscribe(

      (res: any) => {
        console.log("reg", res)
      },
      err => {
        console.log(err);
      });   
  }

}
