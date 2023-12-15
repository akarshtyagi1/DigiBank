import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../core/service/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Transactions } from '../../core/models/class/transactions';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit {
  constructor(
    private userServices: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  accountNumber: string = '';
  dataSource: any = null;
  transactions?: Transactions[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.accountNumber = params['accountNumber'];
    });
    this.loadData();
  }

  loadData() {
    this.transactions = this.userServices.getTransactions(this.accountNumber);
    this.dataSource = new MatTableDataSource(this.transactions);
  }

  displayedColumns: string[] = [
    'From',
    'To',
    'Name',
    'Type',
    'Amount',
    'Balance',
    'Time',
  ];
}
