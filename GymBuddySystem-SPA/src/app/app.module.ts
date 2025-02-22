import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from '././_services/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './_services/alertify.service';
import { WorkoutService } from './_services/workout.service';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { WorkoutComponent } from './workout/workout.component';
import { TimerComponent } from './timer/timer.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { GrowthComponent } from './growth/growth.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    WorkoutComponent,
    TimerComponent,
    ExerciseComponent,
    GrowthComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    AlertifyService,
    WorkoutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
