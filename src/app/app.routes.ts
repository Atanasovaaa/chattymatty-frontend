import { Routes } from '@angular/router';
import { UserPage } from './features/user/user.component';
import { UserListPage } from './features/user-list/user-list.component';

export const routes: Routes = [
    {
        path: '',
        component: UserPage
    },
    {
        path: 'users',
        component: UserListPage
    }
];
