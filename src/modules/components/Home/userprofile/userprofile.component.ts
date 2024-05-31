import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../login-auth/login.service';
import Swal from 'sweetalert2';
import { ManagebookService } from '../../Services/managebook.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

  ngRegID: any = 0;
  registerForm !: FormGroup;
  submitted: boolean = false;
  fb = inject(FormBuilder);
  sc = inject(LoginService);
  scl = inject(ManagebookService);
  gologinpage: boolean = false;
  usertypes: any = null;
  userID: any = 0;
  constructor() { }

  ngOnInit(): void {


    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null;
    }

    this.registerForm = this.fb.group({
      ngName: [null, [Validators.required]],
      ngAddress: [null],
      ngPhone: [null],
      ngEmailId: [null, [Validators.required]],
      ngUserType: [null, [Validators.required]],
      ngPasswords: [null, [Validators.required]]
    });

    this.getuserdetils()
  }


  get forms() {
    return this.registerForm.controls;
  }

  //#region Create user 
  createFormSave() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var obj = {
      "reg_ID": this.ngRegID,
      "name": this.registerForm.value.ngName,
      "phoneNo": this.registerForm.value.ngPhone,
      "email": this.registerForm.value.ngEmailId,
      "userTypeID": parseInt(this.registerForm.value.ngUserType),
      "password": this.registerForm.value.ngPasswords
    };

    this.sc.register(obj).subscribe((res: any) => {
      this.clearVendorDetail();
      Swal.fire({
        text: 'Sucessfully',
        icon: 'success',
        confirmButtonColor: '#0dcaf0',
      });
      this.getuserdetils();
    })  
  }
  //#endregion

  //#region Enter Number Only
  numberOnlyValidation(event: any) {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
    } else {
      event.preventDefault();
    }
  }
  //#endregion

  //#region Clear button functionality
  clearVendorDetail() {
    this.submitted = false;
    this.registerForm.reset();
  }
  //#endregion

  getuserdetils() {
    this.scl.GetUserProfilesc(this.userID).subscribe((res: any) => {
      this.editbinding(res?.data);
    })
  }

  //#region Edit button functionality
  editbinding(obj: any) {
    this.ngRegID = obj?.regId;
    this.registerForm.get('ngName')?.setValue(obj?.userName);
    this.registerForm.get('ngAddress')?.setValue(obj?.address);
    this.registerForm.get('ngPhone')?.setValue(obj?.phoneNo);
    this.registerForm.get('ngEmailId')?.setValue(obj?.emailId);
    this.registerForm.get('ngUserType')?.setValue(obj?.userTypeId);
    this.registerForm.get('ngPasswords')?.setValue(obj?.password);
    setTimeout(() => {
      this.disablefunction(true);      
    }, 200);
  }
  //#endregion

  edittrue:boolean=false;
  editbutton(){
    this.disablefunction(false);
  }

  //#region Enable disable function
  disablefunction(bol:boolean){
    if(bol ==true)
    {
      this.edittrue=false;
      this.registerForm.get('ngName')?.disable();
      this.registerForm.get('ngAddress')?.disable();
      this.registerForm.get('ngPhone')?.disable();
      this.registerForm.get('ngEmailId')?.disable();
      this.registerForm.get('ngUserType')?.disable();
      this.registerForm.get('ngPasswords')?.disable();
    }
    else{
      this.registerForm.get('ngName')?.enable();
      this.registerForm.get('ngAddress')?.enable();
      this.registerForm.get('ngPhone')?.enable();
      this.registerForm.get('ngEmailId')?.enable();
      this.registerForm.get('ngUserType')?.enable();
      this.registerForm.get('ngPasswords')?.enable();
      this.edittrue = true;
    }
    

  }
  //#endregion
}
