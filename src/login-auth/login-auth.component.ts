import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-auth.component.html',
  styleUrl: './login-auth.component.scss'
})
export class LoginAuthComponent {
  router = inject(Router);
  sc = inject(LoginService);
  Loginform!: FormGroup;
  submitted: boolean = false;
  response:any=null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {


    this.Loginform = this.fb.group({
      ngEmailID: [null, [Validators.required]],
      ngPassword: [null, [Validators.required]],
    });
  }

  get forms() {
    return this.Loginform.controls;
  }

  loginBtn() {
    this.submitted = true;

    if (this.Loginform.invalid) {
      return;
    }

    
    var obj = {
      "emailID": this.Loginform.value.ngEmailID,
      "password": this.Loginform.value.ngPassword
    }

    this.sc.loginsc(obj).subscribe((res:any)=>{
      console.log(res)
      this.response=res;
      if(this.response.status==false){
        Swal.fire({
          text: 'Invalid Detials',
          icon: 'error',
          confirmButtonColor: '#0dcaf0',
        });
        this.Loginform.reset();
      }
      else{            
        this.sc.setSessionStorage(this.response?.data?.token,this.response?.data?.expiryTime);
        localStorage.setItem('usertype',JSON.stringify(this.response.data)) 
        this.router.navigateByUrl('firstProject'); 
      }
    })
  }

  

  

}