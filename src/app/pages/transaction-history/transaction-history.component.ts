import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../core/service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transactions } from '../../core/models/class/transactions';
import { AuthService } from '../../core/service/auth/auth.service';
import { User } from '../../core/models/class/user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AccountDetails } from '../../core/models/class/account-details';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit {
  constructor(
    private userServices: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  faTelegram = faTelegram;
  accountNumber: string = '';
  transactions?: Transactions[];
  dataSource!: MatTableDataSource<any>;
  user?: User;
  selectedAccount?: AccountDetails;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.accountNumber = params['accountNumber'];
    });
                                        
    this.userServices
      .getTrans(this.userServices.getCustomerId(), this.accountNumber)
      .subscribe((data) => {
        this.transactions = data;
        this.dataSource = new MatTableDataSource(this.transactions);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'timeStamp':
              return new Date(item.timeStamp);
            default:
              return item[property];
          }
        };
        this.dataSource.sort.sort({
          id: 'timeStamp',
          start: 'desc',
          disableClear: false,
        });
        this.dataSource.paginator = this.paginator;
      });

    this.authService.getAuthenticatedUser()?.subscribe({
      next: (data) => {
        this.user = data;
        for (let i = 0; i < this.user.accountDetails.length; i++) {
          if (
            this.user.accountDetails[i].accountNumber === this.accountNumber
          ) {
            this.selectedAccount = this.user.accountDetails[i];
          }
        }
      },
    });
  }

  goToTransfer() {
    sessionStorage.setItem('accountNumber', this.accountNumber);
    this.router.navigate(['/transfer']);
  }

  displayedColumns: string[] = [
    'from',
    'to',
    'type',
    'amount',
    'balance',
    'timeStamp',
  ];
}
