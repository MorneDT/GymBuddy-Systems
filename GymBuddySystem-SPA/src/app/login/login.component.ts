import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../_models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials: LoginUser;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.credentials = Object.assign({}, this.loginForm.value);
      this.authService.login(this.credentials).subscribe(() => {
        this.alertify.success('Logged in successfully.');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.credentials).subscribe(() => {
          this.router.navigate(['/user']);
        });
      });
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out.');
    this.router.navigate(['/home']);
  }
}
