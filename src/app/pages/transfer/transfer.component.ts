import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { UserService } from '../../core/service/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/class/user';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userServices: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}

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
    payerAccount: ['', Validators.required],
    payeeAccount: ['', Validators.required],
  });

  transfer() {
    const url = '/transactions/' + this.transferForm.get('payerAccount')?.value;
    for (let i = 0; i < this.user!.accountDetails.length; i++) {
      if (
        this.user?.accountDetails[i].accountNumber ===
        this.transferForm.get('payerAccount')?.value
      ) {
        if (
          this.user!.accountDetails[i].balance >
          this.transferForm.get('amount')?.value
        ) {
          this.userServices.transferFunds(this.transferForm.value);
          this.toast.success('Transaction Successfull');
          setTimeout(() => {
            this.router.navigate([url]);
          }, 2000);
        } else {
          this.toast.info('Insufficient Funds', 'Info');
        }
      }
    }
  }
}
