import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountNumber',
})
export class AccountNumberPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const formattedAccountNumber = value.replace(/(.{4})/g, '$1-');
    return formattedAccountNumber.trim();
  }
}
