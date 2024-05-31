
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../service/main-service/main.service';
import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  sc = inject(MainService);

  public Login='Login/LoginUser';
  public NewRegister = 'Login/RegisterForm';
  public getrefershtoken = 'Authentication/RefreshToken?Authorization=';


  constructor(private http: HttpClient) { }


  setSessionStorage(token:string,extime:number){
    sessionStorage.setItem('token',btoa(token));

    setTimeout(() => {
      this.getRefreshTokensc(token);
    }, extime-10000);

  }

  getRefreshTokensc(token:string)
  {
    this.sc.GetMethod(this.getrefershtoken,token).subscribe((res:any)=>{
      if(res.status==false){
        Swal.fire({
          text: 'Session Time Out',
          icon: 'error',
          confirmButtonColor: '#0dcaf0',
        });
      }
      else{
        this.setSessionStorage(res?.data?.token,res?.data?.expiryTime);
      }
    })
  }


  loginsc(obj:any) {
     return this.sc.LoginMethod(this.Login,obj);
  }

  register(obj:any){
    return this.sc.PostMethod(this.NewRegister,obj);
  }
  // return this.http.post(this.url+this.Login,obj);
  // }

  
  
}
