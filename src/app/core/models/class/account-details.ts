import { Transactions } from './transactions';

export class AccountDetails {
  accountNumber: string;
  type: string;
  balance: number;
  deposit: number;
  transactions: Transactions[];

  constructor(
    accountNumber: string,
    type: string,
    balance: number,
    deposit: number,
    transactions: Transactions[]
  ) {
    this.accountNumber = accountNumber;
    this.type = type;
    this.balance = balance;
    this.deposit = deposit;
    this.transactions = transactions;
  }
}
