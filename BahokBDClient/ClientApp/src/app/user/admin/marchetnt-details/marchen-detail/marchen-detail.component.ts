import { Component, OnInit } from '@angular/core';
import { MarchentDetailService } from '../marchentshared/marchent-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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

  constructor(public service: MarchentDetailService, private toastr: ToastrService) {
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
    this.service.marchent = {
      Id: '',
      FullName: '',
      UserName: '',
      Email: '',
      Phone: '',
      PayBankId: "00000000-0000-0000-0000-000000000000",
      PayTypeId: "00000000-0000-0000-0000-000000000000",
      BranchId: "00000000-0000-0000-0000-000000000000",
      AccountName: '',
      AccountNumber: '',
      BusinessAddress: '',
      BusinessName: '',
      BusinessLink: '',
      RoutingName: '',
      //ImageFile: null,
      //LogoFile: null,

    }
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
  getRoutingByTypeId() {
    //this.service.routingNoByBranchId();
  }
  onSubmit() {
    this.service.register().subscribe(

      (res: any) => {
        console.log("reg", res)
        //this.service..reset();
        this.service.imageFileToUpload = null
        this.service.logoFileToUpload = null
        this.toastr.success('Register', 'Successfully');
      },
      err => {
        console.log(err);
      });
  }
}
