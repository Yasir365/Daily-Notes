import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.gaurd';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./index/index.component').then(m => m.IndexComponent),
    },
    {
        path: 'dashbaord', canActivate: [AuthGuard], loadComponent: () => import('./dashboard/dashboard.component').then(m => m.dashbaordComponent)
    },
    {
        path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact-us', loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent)
    },
    {
        path: 'sign-in', loadComponent: () => import('./auth/sign-in/sign-in.component').then(m => m.SignInComponent)
    },
    {
        path: 'sign-up', loadComponent: () => import('./auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin-pannel/admin-pannel.component').then(m => m.AdminPannelComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full'
            },
            {
                path: 'dashboard', loadComponent: () => import('./admin-pannel/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'users', loadComponent: () => import('./admin-pannel/users/users.component').then(m => m.UsersComponent)
            }
        ]
    },
];
