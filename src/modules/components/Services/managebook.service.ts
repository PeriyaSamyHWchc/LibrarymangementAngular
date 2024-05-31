import { Injectable, inject } from '@angular/core';
import { MainService } from '../../../service/main-service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ManagebookService {

  sc = inject(MainService);
  constructor() { }

  public getBooks='Book/GetBooks';
  public addBook='Book/AddBook';
  public getuserDeails='Login/GetAllUsers';
  public requestbooks = 'Book/GetRequestBooks';
  public acceptrequest = 'Book/AcceptRequest?Trans_ID=';
  public bookrequest = 'Book/BookRequest';
  public issuedBooks = 'Book/IssuedBooks?Regis_ID=';
  public returnBook = 'Book/ReturnBook?Trans_ID=';
  public getuserprofile = 'Login/GetUser?Reg_Id=';
  public getusertranscations = 'Book/GetBookUser?UserId=';
  

  GetBookssc(){
    return this.sc.GetMethod(this.getBooks,'');
  }

  AddBooksc(obj:any)
  {
    return this.sc.PostMethod(this.addBook,obj);
  }

  GetUserDetialssc()
  {
    return this.sc.GetMethod(this.getuserDeails,'');
  }

  RequestBookssc()
  {
    return this.sc.GetMethod(this.requestbooks,'');
  }

  AcceptRequestsc(id:any)
  {
    return this.sc.GetMethod(this.acceptrequest,id);
  }

  BookRequestsc(obj:any)
  {
    return this.sc.PostMethod(this.bookrequest,obj);
  }

  IssuedBookssc(id:any)
  {
    return this.sc.GetMethod(this.issuedBooks,id);
  }

  ReturnBooksc(id:any)
  {
    return this.sc.GetMethod(this.returnBook,id);
  }

  GetUserProfilesc(id:any)
  {
    return this.sc.GetMethod(this.getuserprofile,id);
  }

  GetUserTranscationssc(id:any)
  {
    return this.sc.GetMethod(this.getusertranscations,id);
  }
}
