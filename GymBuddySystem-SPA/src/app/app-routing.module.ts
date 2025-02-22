import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { WorkoutComponent } from './workout/workout.component';
import { GrowthComponent } from './growth/growth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'auth', children:[
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ] 
  },
  { path: 'user',  component: UserComponent },
  { path: 'workout',  component: WorkoutComponent },
  { path: 'growth', component: GrowthComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
