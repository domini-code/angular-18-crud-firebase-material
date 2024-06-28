import { Routes } from '@angular/router';

const contactsRoute:Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent),
  }
];

export default contactsRoute;
