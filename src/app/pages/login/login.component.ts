import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private login: AuthService,
    private router: Router
  ) {}

  faShield = faShieldAlt;

  loginForm = this.fb.group({
    customerId: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    this.login.authenticate(this.loginForm.value).subscribe({
      next: (user) => {
        if (user) this.router.navigate(['/dashboard']);
      },
      error: (error) => console.log(error),
    });
  }
}
