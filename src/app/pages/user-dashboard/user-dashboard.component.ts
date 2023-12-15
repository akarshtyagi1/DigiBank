import { Component, OnInit } from '@angular/core';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/service/auth/auth.service';
import { User } from '../../core/models/class/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  user: User | undefined | null = this.authService.getAuthenticatedUser();
  faSlider = faSlidersH;
  accountsBlock = [
    'Manage Limit',
    'Recharge',
    'Send Money',
    'Open FD',
    'Debit/ATM',
  ];
  centerBlock = ['Electricity', 'Mutual Funds', 'PostPaid', 'FastTag'];

  navTrans(accountNumber: string) {
    const url = '/transactions/' + accountNumber;
    this.router.navigate([url]);
  }
}
