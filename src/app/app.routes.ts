import { Routes } from '@angular/router';
import { LoginAuthComponent } from '../login-auth/login-auth.component';
import { RegisterComponent } from '../register/register.component';

export const routes: Routes = [
    {
        path: '',
        component:LoginAuthComponent        
    },
    {
        path: 'Register',
        component:RegisterComponent        
    },
    {
        path:'firstProject',
        loadChildren:()=>
        import('../modules/navBar/navbarmod/navbarmod.module').then((x)=>x.NavbarmodModule)
    }
];
