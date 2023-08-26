import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { Role } from './common/enums/role.enum';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   roles: [Role.User, Role.Admin]
    // }
  },
  {
    path: 'events',
    component: EventsPageComponent
  },
  {
    path: 'events/details',
    component: EventsPageComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    data:{
      roles: [Role.Admin]
    }
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
