import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ManagebookService } from '../../Services/managebook.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent implements OnInit  {
 
  sc = inject(ManagebookService);
  totalbooks:any=0;
  totaluser:any=0;
  issuedBook:any=0;
  usertypes:any=null;
  availbooks:any=0;
  userID:any=0;
  
  constructor(){}

  ngOnInit(): void {
    
    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null;
    }
    this.gettotalbooks();
    setTimeout(() => {
      this.getIssuedBooks()
    }, 100);
  }

  gettotalbooks()
  {
    this.sc.GetBookssc().subscribe((res:any)=>{
      this.availbooks=this.availablebooks(res.data);
      this.totalbooks = res.data.length;
    })

    this.sc.GetUserDetialssc().subscribe((res:any)=>{
      this.totaluser = res.data.length;
    })
    
  }

  getIssuedBooks() {
    if(this.userID ==2)
    {
      this.sc.IssuedBookssc(this.userID).subscribe((res: any) => {
        this.issuedBook = res?.data.length;
      })
    }
    else{
      this.issuedBook = this.totalbooks-this.availbooks;
    }
  }

  availablebooks(obj: any): number {
    var a = obj.filter((x: any) => {
        return x.availability === true; 
    });
    return a.length;
}

}
