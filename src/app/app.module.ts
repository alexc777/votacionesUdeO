import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//Firestore
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";

//NgPrime
import { GalleriaModule } from "primeng/galleria";

import { OverlayPanelModule } from "primeng/overlaypanel";

/* Graficos */
import { ChartsModule } from "ng2-charts";

/* Rutas */
import { appRouting } from "./app.routes";
import { DashboardComponent } from "./views/pages/dashboard/dashboard.component";
import { MenuComponent } from "./views/layouts/menu/menu.component";
import { ProyectosComponent } from "./views/pages/proyectos/proyectos.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { ToastrModule } from "ngx-toastr";
import { AboutComponent } from "./views/pages/about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    ProyectosComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    appRouting,
    FormsModule,
    OverlayPanelModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    GalleriaModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
