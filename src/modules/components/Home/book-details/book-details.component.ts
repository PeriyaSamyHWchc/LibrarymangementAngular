import { Component, OnInit, inject } from '@angular/core';
import { ManagebookService } from '../../Services/managebook.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  list: any = [];
  sc = inject(ManagebookService);
  usertypes:any=null;
  userID:any=0;

  ngOnInit(): void {

    
    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null; 
    }
    this.getBooks();
  }


  //#region Get Books Details
  getBooks() {
    this.sc.GetBookssc().subscribe((res: any) => {
      this.list = res.data;
    })
  }
  //#endregion

  //#region request functionality
  requeststatus(transactions: any): boolean {
    if (transactions.length > 0) {
      var a = transactions.filter((a:any)=>
      a.borrowedRequest == 1
      ).length;
      if (a){
        return false;
      }      
      return true;
    }
    else {
      return true;
    }

  }
  //#endregion


  //#region Book Request
  bookRequest(bookid:any) {

    var obj ={
      "trans_ID": 0,
      "book_ID": bookid,
      "reg_ID": this.userID
    };

    this.sc.BookRequestsc(obj).subscribe((res:any)=>{
      if(res.status == false)
      {
        Swal.fire({
          text: res.errorCode,
          icon: 'error',
          confirmButtonColor: '#0dcaf0',
        });
        return;
      }

    this.getBooks();
    })


  }
  //#endregion
}
