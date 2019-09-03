import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

/* Graficos */
import { ChartsModule } from 'ng2-charts';

/* Rutas */
import { appRouting } from './app.routes';

import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { MenuComponent } from './views/layouts/menu/menu.component';
import { ProyectosComponent } from './views/pages/proyectos/proyectos.component';
import { LoginComponent } from './views/auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    ProyectosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRouting,
    FormsModule,
    OverlayPanelModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
