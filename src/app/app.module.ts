import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AppComponent } from './app.component';

/* Rutas */
import { appRouting } from './app.routes';

import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { MenuComponent } from './views/layouts/menu/menu.component';
import { ProyectosComponent } from './views/pages/proyectos/proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    appRouting,
    OverlayPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
