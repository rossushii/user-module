import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcknowledgementComponent } from './component/acknowledgement/acknowledgement.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { ForgotPasswordGuard } from './guard/forgotpassword.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent ,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent ,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'forgotpassword/acknowledge',
    component: AcknowledgementComponent,
    canActivate: [ForgotPasswordGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
