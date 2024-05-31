import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from '../../components/Home/book-details/book-details.component';
import { BookrequestComponent } from '../../components/Home/bookrequest/bookrequest.component';
import { IssueBooksComponent } from '../../components/Home/issue-books/issue-books.component';
import { ManageBooksComponent } from '../../components/Home/manage-books/manage-books.component';
import { ManageuserComponent } from '../../components/Home/manageuser/manageuser.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../components/Home/dash-board/dash-board.component').then(m => m.DashBoardComponent)
      },
      {
        path: 'BookDetails',
        loadComponent:()=>
        import('../../components/Home/book-details/book-details.component').then(m=>m.BookDetailsComponent)
      },
      {
        path: 'BookRequest',
        loadComponent:()=>
        import('../../components/Home/bookrequest/bookrequest.component').then(m=>m.BookrequestComponent)
      },
      {
        path: 'IssuedBook',
        loadComponent:()=>
        import('../../components/Home/issue-books/issue-books.component').then(m=>m.IssueBooksComponent)
      },
      {
        path: 'ManageBooks',
        loadComponent:()=>
        import('../../components/Home/manage-books/manage-books.component').then(m=>m.ManageBooksComponent)
      },
      {
        path: 'ManageUser',
        loadComponent:()=>
        import('../../components/Home/manageuser/manageuser.component').then(m=>m.ManageuserComponent)
      },{
        path:'Userprofile',
        loadComponent:()=>
        import('../../components/Home/userprofile/userprofile.component').then(m=>m.UserprofileComponent)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarmodRoutingModule { }
