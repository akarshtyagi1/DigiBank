import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../../core/service/currency.service';

@Pipe({
  name: 'currencyPipe',
})
export class CurrencyPipePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const currencyService: CurrencyService = new CurrencyService();
    const currencySymbol = currencyService.getCurrencySymbol();
    const formattedValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `${currencySymbol} ${formattedValue}`;
  }
}
