import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
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
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    component: IntroGuard,
    data: {
      title: 'Configuración Inicial'
    }
  },
  {
    path: 'login',
    canActivate: [AutoLoginGuard],
    component: LoginComponent,
    data: {
      title: 'Inicio de sesión'
    }
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: {
      title: 'Inicio'
    }
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProductsIndexComponent,
        data: {
          title: 'Productos',
          showListOptions: {
            search: true,
            add: true,
            reload: true
          }
        }
      },
    ],
  },
  {
    path: 'providers',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProvidersIndexComponent,
        data: {
          title: 'Proveedores',
          showListOptions: {
            search: true,
            add: true,
            reload: true
          }
        }
      },
    ],
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    component: ReportsComponent,
    data: {
      title: 'Reportes'
    }
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: UsersIndexComponent,
        data: {
          title: 'Usuarios',
          showListOptions: {
            search: true,
            add: true,
            reload: true
          }
        }
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: UsersCreateComponent,
        data: {
          title: 'Agregar nuevo usuario',
          showListOptions: {
            search: false,
            add: false,
            reload: false,
            back: true
          }
        }
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        component: UsersShowComponent,
        data: {
          title: 'Información del usuario',
          showListOptions: {
            search: false,
            add: false,
            reload: false,
            back: true
          }
        }
      },
      {
        path: ':id/edit',
        canActivate: [AuthGuard],
        component: UsersEditComponent,
        data: {
          title: 'Actualizar información del usuario',
          showListOptions: {
            search: false,
            add: false,
            reload: false,
            back: true
          }
        }
      }
    ],
  },
  {
    path: 'boxes',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: BoxesIndexComponent,
        data: {
          title: 'Cajas',
          showListOptions: {
            search: true,
            add: true,
            reload: true
          }
        }
      },
    ],
  },
  {
    path: 'purchases',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: PurchasesIndexComponent,
        data: {
          title: 'Compras',
          showListOptions: {
            search: true,
            add: true,
            reload: true
          }
        }
      },
    ],
  },
  {
    path: 'preferences',
    canActivate: [AuthGuard],
    component: PreferencesComponent,
    data: {
      title: 'Preferences'
    }
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {
      title: 'Perfil'
    }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
