import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLogged } from 'src/utils/isLogged';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const session = isLogged();

const routes: Routes = session
  ? [
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'admin', component: AdminComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  : [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/login' },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
