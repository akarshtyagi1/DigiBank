import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Transactions } from '../../models/class/transactions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthService) {}

  getTransactions(accountNumber: string): Transactions[] | undefined {
    const accountDetails =
      this.authService.getAuthenticatedUser()?.accountDetails;
    if (accountDetails) {
      for (let i = 0; i < accountDetails?.length; i++) {
        if (accountDetails[i].accountNumber === accountNumber)
          return accountDetails[i].transactions;
      }
    }

    return undefined;
  }
}
