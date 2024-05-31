import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) { }

  private ApiUrl : string = environment.apiurl;

  LoginMethod(url : string , obj : any){
    return this.http.post( this.ApiUrl + url , obj );
  }


  public getToken(): string {
    const encodedToken = sessionStorage.getItem('token');
    if (encodedToken) {
      return atob(encodedToken);
    }
    return '';
  }
  
  clearallinlogout()
  {
    sessionStorage.clear();
    localStorage.clear();
  }



  PostMethod(url : string , obj : any) : Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found in session storage');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<any>( this.ApiUrl + url , obj , { headers : headers } );
  }
  

  GetMethod(url : string , id : string | number) : Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found in session storage');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<any>(this.ApiUrl + url + id, { headers: headers });
  }

  // GetMethod(url : string , id : string | number) : Observable<any> {return this.http.get<any>( this.ApiUrl + url + id);
  // }

  // PostMethod(url : string , obj : any) : Observable<any> {
  //   return this.http.post<any>( this.ApiUrl + url , obj);
  // }

}
