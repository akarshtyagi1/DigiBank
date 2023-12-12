import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Transactions } from '../../models/class/transactions';
import { MasterService } from '../master/master.service';
import { environment } from '../../../../environments/environment.development';
import { APIConstant } from '../../constant/APIConstant';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/class/user';
import { AccountDetails } from '../../models/class/account-details';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private master: MasterService,
    private router: Router
  ) {}

  getCustomerId() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user) {
      return JSON.parse(user).customerId;
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.master.get(environment.api + APIConstant.user.getAllUsers);
  }

  getTrans(
    customerId: string,
    accountNumber: string
  ): Observable<Transactions[]> {
    return new Observable((observer) => {
      let subscription: Subscription;

      subscription = this.getAllUsers().subscribe({
        next: (data: User[]) => {
          const user = data.find((res) => res.customerId === customerId);

          if (user) {
            const account: AccountDetails | undefined =
              user.accountDetails.find(
                (account) => account.accountNumber === accountNumber
              );

            if (account) {
              observer.next(account.transactions);
              observer.complete();
            } else {
              observer.error('Account not found');
            }
          } else {
            observer.error('User not found');
          }
        },
        error: (err) => observer.error(err),
        complete: () => subscription.unsubscribe(),
      });
    });
  }

  transferFunds(transfer: any) {
    this.getUserDetails(transfer.payerAccount).subscribe({
      next: (data) => {
        for (let i = 0; i < data.accountDetails.length; i++) {
          if (data.accountDetails[i].accountNumber == transfer.payerAccount) {
            data.accountDetails[i].balance =
              data.accountDetails[i].balance - transfer.amount;
            if (data.accountDetails[i].balance >= 0) {
              const transaction = new Transactions(
                'Debit',
                transfer.payerAccount,
                transfer.amount,
                data.accountDetails[i].balance,
                '',
                new Date().toISOString(),
                transfer.payeeAccount
              );
              data.accountDetails[i].transactions.push(transaction);
              this.master
                .put(
                  environment.api +
                    APIConstant.user.getAllUsers +
                    '/' +
                    data.id,
                  data
                )
                .subscribe({
                  error: (error) => console.log(error),
                });
            } else {
            }
            break;
          }
        }
      },
    });

    this.getUserDetails(transfer.payeeAccount).subscribe({
      next: (data) => {
        for (let i = 0; i < data.accountDetails.length; i++) {
          if (data.accountDetails[i].accountNumber == transfer.payeeAccount) {
            data.accountDetails[i].balance =
              data.accountDetails[i].balance + transfer.amount;

            const transaction = new Transactions(
              'Credit',
              transfer.payerAccount,
              transfer.amount,
              data.accountDetails[i].balance,
              '',
              new Date().toISOString(),
              transfer.payeeAccount
            );
            data.accountDetails[i].transactions.push(transaction);
            this.master
              .put(
                environment.api + APIConstant.user.getAllUsers + '/' + data.id,
                data
              )
              .subscribe({
                error: (error) => console.log(error),
              });
          }
        }
      },
      error: (error) => console.error(error),
    });
  }

  getUserDetails(accountNumber: string): Observable<User> {
    return new Observable((observer) => {
      let subscription: Subscription;

      subscription = this.getAllUsers().subscribe({
        next: (data: User[]) => {
          let payee: User | undefined;
          data.forEach((user) => {
            const account = user.accountDetails.find(
              (account) => account.accountNumber === accountNumber
            );
            if (account) {
              payee = user;
            }
          });
          if (payee) {
            observer.next(payee);
            observer.complete;
          } else {
            observer.error('Payee Account not found');
          }
        },
        error: (err) => observer.error(err),
        complete: () => subscription.unsubscribe(),
      });
    });
  }
}
