import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePipe',
})
export class DatePipePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    const date = new Date(value);

    // Use Angular's DatePipe for formatting
    const formattedDate = new DatePipe('en-US').transform(
      date,
      'yyyy-MMM-dd hh:mm a'
    );

    return formattedDate;
  }
}
