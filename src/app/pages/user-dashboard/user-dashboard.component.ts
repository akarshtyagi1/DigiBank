import { Component, OnInit } from '@angular/core';
import {
  faSlidersH,
  faChevronRight,
  faMobile,
  faMoneyBill,
  faBolt,
  faBullhorn,
  faSimCard,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faCcVisa } from '@fortawesome/free-brands-svg-icons';

import { AuthService } from '../../core/service/auth/auth.service';
import { User } from '../../core/models/class/user';
import { Router } from '@angular/router';
import { AccountNumberPipe } from '../../shared/pipe/account-number.pipe';
import { CurrencyPipePipe } from '../../shared/pipe/currency-pipe.pipe';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.scss',
    standalone: true,
    imports: [
        FaIconComponent,
        NgFor,
        MatButtonModule,
        MatRippleModule,
        CurrencyPipePipe,
        AccountNumberPipe,
    ],
})
export class UserDashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  user: User | undefined | null;

  faSlider = faSlidersH;
  faChevRight = faChevronRight;
  faMobile = faMobile;
  faTelegram = faTelegram;
  faMoney = faMoneyBill;
  faCard = faCcVisa;
  faBolt = faBolt;
  faMF = faBullhorn;
  faSim = faSimCard;
  faFastTag = faTag;

  accountsBlock = [
    { name: 'Manage Limit', icon: this.faSlider },
    { name: 'Recharge', icon: this.faMobile },
    { name: 'Send Money', icon: this.faTelegram },
    { name: 'Open FD', icon: this.faMoney },
    { name: 'Debit/ATM', icon: this.faCard },
  ];
  centerBlock = [
    { name: 'Electricity', icon: this.faBolt },
    { name: 'Mutual Funds', icon: this.faMF },
    { name: 'Prepaid', icon: this.faSim },
    { name: 'FastTag', icon: this.faFastTag },
  ];

  ngOnInit(): void {
    this.authService.getAuthenticatedUser()?.subscribe({
      next: (data: User) => {
        this.user = data;
      },
    });
  }
  navTrans(accountNumber: string) {
    const url = '/transactions/' + accountNumber;
    this.router.navigate([url]);
  }
}
