import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

// import { LoginComponent } from './components/home/login/login.component';
// import { SignUpComponent } from './components/home/signup/signup.component';
import { AdminDashboardComponent } from './components/home/admin-dashboard/admin-dashboard.component';
import { MemberComponent } from './components/home/member/member.component';
import { LoginComponent } from './components/home/login/login.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'sign-up', component: SignUpComponent },
  { path: 'member', component: MemberComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  { path: '**', pathMatch: 'full', redirectTo: '/' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
