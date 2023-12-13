import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
  message: string = '';
  constructor(
    private fb: FormBuilder,
    private login: AuthService,
    public router: Router,
    private toast: ToastrService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (this.login.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
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
        error: (error) => {
          this.toast.error(error.message, '', {
            positionClass: 'toast-custom-position',
          });
          console.log(error);
        },
      });
    } else {
      console.error('LoginForm is not initialized or is invalid.');
    }
  }
}
