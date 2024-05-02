import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { UserService } from '../../core/service/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/models/class/user';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AccountNumberPipe } from '../../shared/pipe/account-number.pipe';
import { CurrencyPipePipe } from '../../shared/pipe/currency-pipe.pipe';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrl: './transfer.component.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        MatButtonModule,
        CurrencyPipePipe,
        AccountNumberPipe,
    ],
})
export class TransferComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userServices: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}

  limit: number = 100000;
  faTelegram = faTelegram;
  user?: User;
  accountNumber?: string | null;

  ngOnInit(): void {
    this.authService.getAuthenticatedUser()?.subscribe({
      next: (data: User) => {
        this.user = data;
      },
    });
    this.accountNumber = sessionStorage.getItem('accountNumber');
  }

  transferForm: FormGroup = this.fb.group({
    amount: [0, Validators.min(100000)],
    payerAccount: ['', Validators.required, Validators.min(100000)],
    payeeAccount: ['', Validators.required],
  });

  isTransfered: boolean = false;

  transfer() {
    if (this.transferForm.get('amount')?.value == 0) {
      this.toast.warning('Enter Amount!', 'Warning', {
        positionClass: 'toast-custom-position',
      });
    } else if (this.transferForm.get('payerAccount')?.value == '') {
      this.toast.warning('Select Payer Account!', 'Warning', {
        positionClass: 'toast-custom-position',
      });
    } else if (this.transferForm.get('payeeAccount')?.value == '') {
      this.toast.warning('Select Payee Account!', 'Warning', {
        positionClass: 'toast-custom-position',
      });
    } else if (this.transferForm.get('amount')?.value > 100000) {
      this.toast.warning('Your daily transaction limit is 100000', 'Warning', {
        positionClass: 'toast-custom-position',
      });
    } else {
      const url =
        '/transactions/' + this.transferForm.get('payerAccount')?.value;
      for (let i = 0; i < this.user!.accountDetails.length; i++) {
        if (
          this.user?.accountDetails[i].accountNumber ===
          this.transferForm.get('payerAccount')?.value
        ) {
          if (
            this.user!.accountDetails[i].balance >
            this.transferForm.get('amount')?.value
          ) {
            this.isTransfered = true;
            this.userServices.transferFunds(this.transferForm.value);
            this.toast.success('Transaction Successfull', ' ', {
              positionClass: 'toast-custom-position',
            });
            setTimeout(() => {
              this.router.navigate([url]);
            }, 2000);
          } else {
            this.toast.info('Insufficient Funds', 'Info', {
              positionClass: 'toast-custom-position',
            });
          }
        }
      }
    }
  }
}
