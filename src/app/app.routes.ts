import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { ProyectosComponent } from './views/pages/proyectos/proyectos.component';
import { LoginComponent } from './views/auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'escritorio', component: DashboardComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
