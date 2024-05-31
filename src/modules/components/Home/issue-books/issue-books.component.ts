import { Component, OnInit, inject } from '@angular/core';
import { MainService } from '../../../../service/main-service/main.service';
import { ManagebookService } from '../../Services/managebook.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-books.component.html',
  styleUrl: './issue-books.component.scss'
})
export class IssueBooksComponent implements OnInit {

  sc = inject(ManagebookService);
  list: any = [];
  usertypes: any = null;
  userID: any = 0;
  ngOnInit(): void {


    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null;
    }
    setTimeout(() => {
      this.getIssuedBooks()
    }, 100);


  }

  getIssuedBooks() {
    this.sc.IssuedBookssc(this.userID).subscribe((res: any) => {
      this.list = res?.data;
    })
  }

  //#region Return Book functions
  ReturnBook(id: any) {
    this.sc.ReturnBooksc(id).subscribe((res: any) => {
      setTimeout(() => {

        this.getIssuedBooks();
      }, 100);
    });
  }
  //#endregion


}
