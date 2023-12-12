import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    password: ['', Validators.required],
  }); 

  faShield = faShieldAlt;

  constructor(
    private fb: FormBuilder,
    private login: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmitted = false;
  onLogin() {
    this.formSubmitted = true;
    // Check if the form is initialized and valid
    if (this.loginForm && this.loginForm.valid) {
      this.login.authenticate(this.loginForm.value).subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => console.log(error),
      });
    } else {
      console.error('LoginForm is not initialized or is invalid.');
    }
  }
}
