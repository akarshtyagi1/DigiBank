import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        NgClass,
        NgIf,
        MatButtonModule,
        FaIconComponent,
        TranslateModule,
    ],
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
