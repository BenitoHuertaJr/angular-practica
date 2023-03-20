import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxElectronModule } from 'ngx-electron';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

// COMPONENTS

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent as UsersCreateComponent } from './pages/users/create/create.component';
import { IndexComponent as UsersIndexComponent } from './pages/users/index/index.component';
import { ShowComponent as UsersShowComponent } from './pages/users/show/show.component';
import { EditComponent as UsersEditComponent } from './pages/users/edit/edit.component';
import { IndexComponent as ProductsIndexComponent } from './pages/products/index/index.component';
import { IndexComponent as BoxesIndexComponent } from './pages/boxes/index/index.component';
import { IndexComponent as ProvidersIndexComponent } from './pages/providers/index/index.component';
import { IndexComponent as PurchasesIndexComponent } from './pages/purchases/index/index.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IntroComponent } from './pages/intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersCreateComponent,
    UsersIndexComponent,
    UsersShowComponent,
    UsersEditComponent,
    ProductsIndexComponent,
    BoxesIndexComponent,
    ProvidersIndexComponent,
    PurchasesIndexComponent,
    PreferencesComponent,
    ReportsComponent,
    ProfileComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxElectronModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
