import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { ProyectosComponent } from './views/pages/proyectos/proyectos.component';
import { LoginComponent } from './views/auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { IsActiveSessionGuard } from './guard/is-active-session.guard';
import { AboutComponent } from './views/pages/about/about.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsActiveSessionGuard]
  },
  {
    path: 'registro',
    component: LoginComponent,
    canActivate: [IsActiveSessionGuard]
  },
  {
    path: 'escritorio',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'acercade',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });
