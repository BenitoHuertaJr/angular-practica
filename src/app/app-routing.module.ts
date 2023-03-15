import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent as UsersCreateComponent} from './pages/users/create/create.component';
import { IndexComponent as UsersIndexComponent } from './pages/users/index/index.component';
import { ShowComponent as UsersShowComponent } from './pages/users/show/show.component';
import { EditComponent as UsersEditComponent } from './pages/users/edit/edit.component';
import { IndexComponent as ProductsIndexComponent } from './pages/products/index/index.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
    canActivate: [AutoLoginGuard],
		component: LoginComponent,
	},
	{
		path: 'home',
    canActivate: [AuthGuard],
		component: HomeComponent
	},
  {
		path: 'users',
		children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: UsersIndexComponent
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: UsersCreateComponent
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        component: UsersShowComponent
      },
      {
        path: ':id/edit',
        canActivate: [AuthGuard],
        component: UsersEditComponent
      }
    ],
	},
  {
		path: 'products',
		children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProductsIndexComponent
      },
    ],
	},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
