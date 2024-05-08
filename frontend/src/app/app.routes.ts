import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent,),
    },
    {
        path: 'auth',
        canActivate: [publicGuard],
        children: [
            {
                path: "login",
                loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent,),
            },
            {
                path: "signup",
                loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent,),
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
