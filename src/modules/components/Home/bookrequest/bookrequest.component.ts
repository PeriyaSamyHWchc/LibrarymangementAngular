import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ManagebookService } from '../../Services/managebook.service';

@Component({
  selector: 'app-bookrequest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookrequest.component.html',
  styleUrl: './bookrequest.component.scss'
})
export class BookrequestComponent implements OnInit {
  sc = inject(ManagebookService);

  list: any = [];
  ngOnInit(): void {
    this.gettranscation();
  }

  gettranscation() {
    this.sc.RequestBookssc().subscribe((res: any) => {
      this.list = res.data;
    })
  }

  Acceptrequest(id: any) {
    this.sc.AcceptRequestsc(id).subscribe((res: any) => {
      setTimeout(() => {        
        this.gettranscation();
      }, 200);
    })
  }
}
