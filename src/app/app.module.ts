import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule }    from '@angular/common/http';
//Firestore
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";

//NgPrime
import {GalleriaModule} from 'primeng/galleria';
import { OverlayPanelModule } from "primeng/overlaypanel";


/* Rutas */
import { appRouting } from "./app.routes";

import { DashboardComponent } from "./views/pages/dashboard/dashboard.component";
import { MenuComponent } from "./views/layouts/menu/menu.component";
import { ProyectosComponent } from "./views/pages/proyectos/proyectos.component";
import { LoginComponent } from "./views/auth/login/login.component";

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
