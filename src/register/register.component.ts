import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login-auth/login.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  submitted:boolean = false;
  fb = inject(FormBuilder);
  sc = inject(LoginService);
  gologinpage:boolean = false;
  constructor(){}

  ngOnInit(): void {   
    
    this.registerForm = this.fb.group({
      ngName: [null, [Validators.required]],
      ngAddress: [null],
      ngPhone:[null],
      ngEmailId:[null,[Validators.required]],
      ngUserType:[null, [Validators.required]],
      ngPasswords:[null, [Validators.required]]
    });

  }

  
  get forms() {
    return this.registerForm.controls;
  }

  //#region Create user 
  createFormSave(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var obj=
    {
      "reg_ID": 0,
      "name": this.registerForm.value.ngName,
      "phoneNo": this.registerForm.value.ngPhone,
      "email": this.registerForm.value.ngEmailId,
      "userTypeID": parseInt(this.registerForm.value.ngUserType),
      "password": this.registerForm.value.ngPasswords
    };
    this.sc.register(obj).subscribe((res:any)=>{
      this.clearVendorDetail();
      this.gologinpage = true;
      Swal.fire({
        text: 'Sucessfully',
        icon: 'success',
        confirmButtonColor: '#0dcaf0',
      });
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
  clearVendorDetail(){
    this.submitted = false;
    this.registerForm.reset();
  }
  //#endregion

}
