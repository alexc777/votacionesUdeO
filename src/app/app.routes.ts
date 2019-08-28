import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { ProyectosComponent } from './views/pages/proyectos/proyectos.component';

const routes: Routes = [
  { path: 'escritorio', component: DashboardComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'escritorio' }
];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
