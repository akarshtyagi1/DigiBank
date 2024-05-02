import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../../core/service/currency/currency.service';

@Pipe({
    name: 'currencyPipe',
    standalone: true,
})
export class CurrencyPipePipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    const currencyService: CurrencyService = new CurrencyService();
    const currencySymbol = currencyService.getCurrencySymbol();
    const formattedValue = value
      ?.toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `${currencySymbol} ${formattedValue}`;
  }
}
