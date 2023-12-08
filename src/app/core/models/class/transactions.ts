export class Transactions {
    type: string;
  from: string;
  to?: string;
  amount: number;
  closing: number;
  name: string;
  timeStamp: string;

  constructor(
    type: string,
    from: string,
    amount: number,
    closing: number,
    name: string,
    timeStamp: string,
    to?: string
  ) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.closing = closing;
    this.name = name;
    this.timeStamp = timeStamp;
  }
}
