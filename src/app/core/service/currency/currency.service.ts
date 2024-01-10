import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}
  currentCurrency: string = 'AUD';

  currencySymbols: { [key: string]: string } = {
    USD: '$', // United States Dollar
    EUR: '€', // Euro
    GBP: '£', // British Pound Sterling
    JPY: '¥', // Japanese Yen
    CNY: '元', // Chinese Yuan
    INR: '₹', // Indian Rupee
    AUD: 'A$', // Australian Dollar
    CAD: 'C$', // Canadian Dollar
    SGD: 'S$', // Singapore Dollar
    NZD: 'NZ$', // New Zealand Dollar
    ZAR: 'R', // South African Rand
    BRL: 'R$', // Brazilian Real
    RUB: '₽', // Russian Ruble
    CHF: 'CHF', // Swiss Franc
    SEK: 'kr', // Swedish Krona
    NOK: 'kr', // Norwegian Krone
    MXN: 'Mex$', // Mexican Peso
    KRW: '₩', // South Korean Won
    TRY: '₺', // Turkish Lira
    AED: 'د.إ', // United Arab Emirates Dirham
    HKD: 'HK$', // Hong Kong Dollar
    IDR: 'Rp', // Indonesian Rupiah
    MYR: 'RM', // Malaysian Ringgit
    PHP: '₱', // Philippine Peso
    THB: '฿', // Thai Baht
    VND: '₫', // Vietnamese Dong
    ARS: '$', // Argentine Peso
    CLP: '$', // Chilean Peso
    COP: '$', // Colombian Peso
    EGP: '£', // Egyptian Pound
    ILS: '₪', // Israeli New Shekel
    KWD: 'K.D.', // Kuwaiti Dinar
    SAR: '﷼', // Saudi Riyal
    QAR: '﷼', // Qatari Riyal
  };

  getCurrencySymbol(): string {
    return this.currencySymbols[this.currentCurrency];
  }
}
