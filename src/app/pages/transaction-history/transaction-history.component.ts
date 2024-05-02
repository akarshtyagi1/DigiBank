import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../core/service/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Transactions } from '../../core/models/class/transactions';
import { AuthService } from '../../core/service/auth/auth.service';
import { User } from '../../core/models/class/user';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AccountDetails } from '../../core/models/class/account-details';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { PdfService } from '../../core/service/pdf/pdf.service';
import { DatePipePipe } from '../../shared/pipe/date-pipe.pipe';
import { AccountNumberPipe } from '../../shared/pipe/account-number.pipe';
import { CurrencyPipePipe } from '../../shared/pipe/currency-pipe.pipe';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrl: './transaction-history.component.scss',
    standalone: true,
    imports: [
        RouterLink,
        MatRippleModule,
        FaIconComponent,
        NgIf,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        UpperCasePipe,
        CurrencyPipePipe,
        AccountNumberPipe,
        DatePipePipe,
    ],
})
export class TransactionHistoryComponent implements OnInit {
  constructor(
    private userServices: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private pdf: PdfService
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

  forPDF: string[] = [
    'from',
    'to',
    'type',
    'name',
    'amount',
    'balance',
    'timeStamp',
  ];

  downloadPdf() {
    const data = this.dataSource.data.map((item) =>
      this.forPDF.map((col) => item[col])
    );
    const headers = this.forPDF.map((col) => col.toUpperCase());
    this.pdf.generatePdf(data, headers, 'table-data');
  }
}
