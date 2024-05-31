import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ManagebookService } from '../../Services/managebook.service';

@Component({
  selector: 'app-manageuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manageuser.component.html',
  styleUrl: './manageuser.component.scss'
})
export class ManageuserComponent implements OnInit {

  sc = inject(ManagebookService);
  list: any = [];
  usertranscations: any = [];

  ngOnInit(): void {
    this.getUserDetails();
  }


  getUserDetails() {
    this.sc.GetUserDetialssc().subscribe((res: any) => {
      this.list = res.data;
    })
  }

  getuserstransations(id: number) {
    this.sc.GetUserTranscationssc(id).subscribe((res: any) => {
      this.usertranscations = res.data;
    })
  }
}
