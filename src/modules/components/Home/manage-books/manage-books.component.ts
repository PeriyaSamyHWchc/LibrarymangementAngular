import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagebookService } from '../../Services/managebook.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.scss'
})
export class ManageBooksComponent implements OnInit {

  bookForm!: FormGroup;
  fb = inject(FormBuilder);
  ReadMore: boolean = true;
  visible: boolean = false;
  submitted: boolean = false;
  list: any = [];
  ngBookID: any = 0;
  updateVendor: boolean = true;
  usertypes: any = null;
  userID: any = 0;
  sc = inject(ManagebookService);
  constructor() {

  }
  ngOnInit(): void {
    this.getBooks();

    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null;
    }


    this.bookForm = this.fb.group({
      ngTitle: [null, Validators.required],
      ngIsbn: [null, Validators.required],
      ngGenre: [null],
      ngPublisher: [null],
      ngEdition: [null],
      ngAvailability: [true],
    });


  }

  get forms() {
    return this.bookForm.controls;
  }


  onclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
    this.submitted = false;
    this.bookForm.reset();
    this.updateVendor = false;
  }

  //#region Get Books Details
  getBooks() {
    this.sc.GetBookssc().subscribe((res: any) => {
      this.list = res.data;
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


  //#region Create & Update Product 
  createFormSave() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    var obj = {
      "book_ID": this.ngBookID,
      "title": this.bookForm.value.ngTitle,
      "isbn": this.bookForm.value.ngIsbn,
      "genre": this.bookForm.value.ngGenre,
      "publisher": this.bookForm.value.ngPublisher,
      "edition": this.bookForm.value.ngEdition,
      "availability": this.bookForm.value.ngAvailability,
      "totalCopies": 0,
      "createdBy": this.userID,
    };

    this.sc.AddBooksc(obj).subscribe((res: any) => {
      if (res.status == false) {
        Swal.fire({
          text: 'Invalid Detials',
          icon: 'error',
          confirmButtonColor: '#0dcaf0',
        });
        this.bookForm.reset();
      }
      else {
        Swal.fire({
          text: 'Book Added Successfully',
          icon: 'success',
          confirmButtonColor: '#0dcaf0',
        });
        this.clearVendorDetail();
        this.onclick();
        this.getBooks();

      }
    })
  }
  //#endregion

  clearVendorDetail() {
    this.submitted = false;
    this.bookForm.reset();
    this.ngBookID = 0;
    this.bookForm.get('ngAvailability')?.setValue(true);
  }
//#region edit data
  editdata(obj: any) {
    this.updateVendor = true;
    this.visible = true;
    this.ReadMore = false;
    this.ngBookID = obj.bookID;
    this.bookForm.get('ngTitle')?.setValue(obj.title);
    this.bookForm.get('ngIsbn')?.setValue(obj.isbn);
    this.bookForm.get('ngGenre')?.setValue(obj.genre);
    this.bookForm.get('ngPublisher')?.setValue(obj.publisher);
    this.bookForm.get('ngEdition')?.setValue(obj.edition);
    this.bookForm.get('ngAvailability')?.setValue(obj.availability);

  }
  //#endregion



}
